import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDataEmail } from '../../../../lib/connect/service';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        // Mendapatkan data pengguna berdasarkan email
        const data = await getDataEmail(email);

        if (!data || data.length === 0) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const user = data[0];

        // Memverifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Login berhasil, mengembalikan data pengguna
        const { id, nama, image, role } = user;

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id,
                nama,
                email,
                image,
                role
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
