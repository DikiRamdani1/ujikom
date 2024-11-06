import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {
    addData,
    getDataEmail
} from "@/lib/connect/service";
import {
    serialize
} from 'cookie';

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            authorize: async (credentials) => {
                const data = await getDataEmail(credentials.email);
                if (data && data.length > 0) {
                    const user = data[0];
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (isValidPassword) {
                        return {
                            id: user.id,
                            name: user.nama,
                            email: user.email,
                            image: user.image,
                            role: user.role
                        };
                    }
                }
                throw new Error("Invalid email or password");
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({
            user,
            account,
            profile
        }) {
            const data = await getDataEmail(user.email);
            if (!data) {
                await addData("user", `(null, '${user.name}', '${user.email}', null, '${user.image}', 'peminjam', NOW())`);
            }
            return true;
        },
        async jwt({
            token,
            user
        }) {
            if (user) {
                const data = await getDataEmail(user.email);
                if (data) {
                    const userData = data[0];
                    token.id = user.id;
                    token.name = userData.nama;
                    token.email = userData.email;
                    token.image = userData.image;
                    token.role = userData.role;
                }
            }
            return token;
        },
        async session({
            session,
            token
        }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.image;
            session.user.role = token.role;
            return session;
        },
    },
    events: {
        async signIn(message) {
            const cookie = serialize('user-status', 'authenticated', {
                httpOnly: true,
                secure: false,
                path: '/',
                maxAge: 60 * 60 * 24 * 3,
            });

            const response = new Response(JSON.stringify({
                message: 'Logged in successfully'
            }), {
                status: 200,
                headers: {
                    'Set-Cookie': cookie,
                    'Content-Type': 'application/json',
                },
            });

            return response;
        },
    },
};

export const handler = NextAuth(options);
export {
    handler as GET, handler as POST
};