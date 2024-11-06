import { getDataWhere, updateData } from "@/lib/connect/service"
import { NextResponse as res } from "next/server"

export const PUT = async (request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const status = searchParams.get("status")

    if (status == "borrowed") {
        try {
            const pinjam = await getDataWhere("peminjaman", "id", id, 5, 0)
            const stockBarang = await getDataWhere("barang", "id", pinjam[0].id_barang, 5, 0)
            const stock = stockBarang[0].stock - pinjam[0].stock
            if (stock < 0) {
                return res.json({status: 401, messgae: "data gagal diupdate"})
            }
            await updateData("barang", `SET stock = '${stock}' WHERE id = ${pinjam[0].id_barang}`)
            await updateData("peminjaman", `SET status = '${status}' WHERE id = ${id}`)
            return res.json({status: 200, messgae: "data berhasil diupdate"})
        } catch (error) {
            return res.json({status: 500, messgae: "data gagal diupdate"})
        }
    } else if (status == "returned") {
        try {
            const pinjam = await getDataWhere("peminjaman", "id", id, 5, 0)
            const stockBarang = await getDataWhere("barang", "id", pinjam[0].id_barang, 5, 0)
            const stock = stockBarang[0].stock + pinjam[0].stock
            await updateData("barang", `SET stock = '${stock}' WHERE id = ${pinjam[0].id_barang}`)
            await updateData("peminjaman", `SET status = '${status}' WHERE id = ${id}`)
            return res.json({status: 200, messgae: "data berhasil diupdate"})
        } catch (error) {
            return res.json({status: 500, messgae: "data gagal diupdate"})
        }
    }
    
}