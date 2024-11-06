import { joinTable } from "@/lib/connect/service";
import { NextResponse as res } from "next/server"

export const GET = async (request) => {
    try {
        const data = await joinTable(`SELECT barang.nama AS nama_barang, barang.merk, user.nama AS nama_user, user.email, peminjaman.stock, peminjaman.status, tgl_pinjam, tgl_kembali FROM peminjaman INNER JOIN barang ON peminjaman.id_barang = barang.id INNER JOIN user ON peminjaman.id_user = user.id`);
        return res.json({status: 200, message: "data berhasil ditemukan", data: data})
    } catch (error) {
        return res.json({status: 500, message: "data gagal ditemukan"})
    }
}