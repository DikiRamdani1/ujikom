import {
    getToken
} from "next-auth/jwt";
import {
    NextResponse
} from "next/server";

export const middleware = async (request) => {
    const {
        pathname
    } = request.nextUrl;
    const token = await getToken({
        req: request
    });


    if (!token) {
        if (pathname.includes("/auth")) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
        if (token.role == "admin") {
            if (pathname.includes("/admin")) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL("/admin", request.url))
            }
        } else {
            if (pathname.includes("/admin") || pathname.includes("/auth")) {
                return NextResponse.redirect(new URL("/", request.url))
            }
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/", "/terbaru/:path*", "/tentang", "/search/:path*", "/profil", "/peminjaman/:path*", "/kategori/:path*", "/barang/:path*", "/admin/:path*", "/auth/:path*"]
};