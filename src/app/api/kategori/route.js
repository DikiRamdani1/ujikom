import { addData, deleteData, getData, pagination } from "@/lib/connect/service"
import { NextResponse as res } from "next/server"

export const GET = async (request) => {
    try {
        const data = await getData("detail_kategori", 10, 0)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("detail_kategori", 100, 1, data.length)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })    } catch (error) {
            return res.json({
                status: 500,
                message: "data gagal ditemukan."
            })
        
    }
}

export const POST = async (request) => {
    const data = await request.formData()
    const nama = data.get("nama")

    try{
        await addData("detail_kategori", `(null, '${nama}')`)
        return res.json({status: 200, message: "data berhaasil ditambah"})
    }catch (e) {
        return res.json({status: 500, message: "data gagal ditambah"})
    }
}

export const DELETE = async (request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    try {
        await deleteData("detail_kategori", id)
        return res.json({status: 200, message: "data berhasil dihapus"})
    } catch (error) {
        console.log(error)
        return res.json({status: 500, message: "data gagal dihapus"})
    }
}
