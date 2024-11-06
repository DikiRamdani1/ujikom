import { addData, getDataEmail } from "@/lib/connect/service";
import bcrypt from "bcryptjs";
import { NextResponse as res } from "next/server";

export const POST = async (request) => {
    const data = await request.json()
    const {name, email, password} = data

    if (!email || !password || !name) {
        return res.json({
            status: 400,
            message: "All fields are required"
        });
    }

    try {
        const existingUser = await getDataEmail(email);
        if (existingUser) {
            return res.json({
                status: 400,
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await addData("user", `(null, '${name}', '${email}', '${hashedPassword}', 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg', 'peminjam', NOW())`);

         return res.json({
            status: 201,
            message: "User registered successfully"
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Failed to register user"
        });
    }

}