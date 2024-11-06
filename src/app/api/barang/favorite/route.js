import {
    addData,
    deleteDataWhere,
    getDataLike,
    joinTable,
    pagination,
    searchData,
} from "@/lib/connect/service";
import {
    NextResponse as res
} from "next/server";

export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const limit = typeof searchParams.get("limit") == "string" ? parseInt(searchParams.get("limit")) : 30
    const page = typeof searchParams.get("page") == "string" ? parseInt(searchParams.get("page")) : 1
    const userId = searchParams.get("userId")
    const barangId = searchParams.get("barangId")
    const offset = (page - 1) * limit

    if (userId && barangId) {
        try {
            const data = await searchData(`SELECT * FROM favorite WHERE id_user = ${userId} AND id_barang = ${barangId}`, limit, offset)
            if (!data) {
                return res.json({
                    status: 404,
                    message: "data gagal ditemukan"
                })
            }
            const paginate = await pagination("barang", limit, page, data.length)
            return res.json({
                status: 200,
                message: "data berhasil ditemukan",
                data: data,
                pagination: paginate
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "data gagal ditemukan"
            })
        }
       
    }

    try {
        const data = await joinTable(`SELECT barang.id, barang.nama, barang.image, barang.rating FROM favorite INNER JOIN barang ON favorite.id_barang = barang.id WHERE favorite.id_user = ${userId} ORDER BY favorite.createdAt DESC LIMIT ${limit} OFFSET ${offset};`)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan"
            })
        }
        const paginate = await pagination("barang", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan",
            data: data,
            pagination: paginate
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal ditemukan."
        })
    }
}

export const POST = async (request) => {
    const {searchParams} = new URL(request.url)
    const idUser = searchParams.get("userId")
    const idBarang = searchParams.get("barangId")

    try {
        await addData("favorite", `(null, ${idUser}, ${idBarang}, NOW())`)
        return res.json({status: 200, message: "data berhasil difavoritekan."})
    } catch (error) {
        return res.json({status: 500, message: "data gagal difavoritekan."})
    }
}

export const DELETE = async (request) => {
    const {searchParams} = new URL(request.url)
    const idUser = searchParams.get("userId")
    const idBarang = searchParams.get("barangId")

    try {
        await deleteDataWhere("favorite", `WHERE id_user = ${idUser} AND id_barang = ${idBarang}`)
        return res.json({status: 200, message: "data berhasil dihapus."})
    } catch (error) {
        return res.json({status: 500, message: "data gagal dihapus."})
    }
}