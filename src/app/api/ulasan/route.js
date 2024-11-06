import getData from "@/lib/api-libs/api"
import { addData, deleteData, getDataWhere, joinTable, pagination, updateData } from "@/lib/connect/service"
import { NextResponse as res } from "next/server"

export const GET = async (request) => {
    const {searchParams} = new URL(request.url)
    const limit = typeof searchParams.get("limit") == "string" ? parseInt(searchParams.get("limit")) : 30
    const page = typeof searchParams.get("page") == "string" ? parseInt(searchParams.get("page")) : 1
    const barangId = searchParams.get("barangId")
    const userId = searchParams.get("userId")
    const offset = (page - 1) * limit

    if (barangId && userId) {
        const data = await joinTable(`SELECT ulasan.id, user.nama, user.image, ulasan.rating, ulasan.content, ulasan.createdAt FROM ulasan INNER JOIN user ON ulasan.id_user = user.id WHERE id_user = ${userId} AND id_barang = ${barangId} LIMIT ${limit} OFFSET ${offset}`)

        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }

        const paginate = await pagination("ulasan", limit, page, data.length, `WHERE id_barang = ${barangId} AND id_user = ${userId}`)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    } else if (barangId) {
        const data = await joinTable(`SELECT ulasan.id, user.nama, user.image, ulasan.id_user, ulasan.rating, ulasan.content, ulasan.createdAt FROM ulasan INNER JOIN user ON ulasan.id_user = user.id WHERE id_barang = ${barangId} ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`)

        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }

        const paginate = await pagination("ulasan", limit, page, data.length, `WHERE id_barang = ${barangId}`)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    }

    return res.json({
        status: 404,
        message: "data gagal ditemukan."
    })
}

export const POST = async (request) => {
    const data = await request.json()
    const {userId, barangId, rating, content} = data
    
    try {
        await addData("ulasan", `(null, ${parseInt(userId)}, ${parseInt(barangId)}, '${parseFloat(rating)}', '${content}', NOW())`)
        const dataRating = await getDataWhere("ulasan", `id_barang`, barangId, 100, 0)
        const averageRating = dataRating.reduce((sum, data) => sum + data.rating, 0) / dataRating.length
        const _rating = parseFloat(averageRating.toFixed(1))
        await updateData("barang", `SET rating = ${_rating} WHERE id=${barangId}`)
        return res.json({status: 200, message: "data berhasil ditambahkan."})
    } catch (error) {
        return res.json({status: 500, message: "data gagal ditambahkan."})
    }
}

export const PUT = async (request) => {
    const data = await request.json()
    const {id, barangId, rating, content} = data

    try {
        await updateData("ulasan", `SET rating = ${rating}, content = '${content}', createdAt = NOW() WHERE id=${id}`)
        const dataRating = await getDataWhere("ulasan", `id_barang`, barangId, 100, 0)
        const averageRating = dataRating.reduce((sum, data) => sum + data.rating, 0) / dataRating.length
        const _rating = parseFloat(averageRating.toFixed(1))
        await updateData("barang", `SET rating = ${_rating} WHERE id=${barangId}`)
        return res.json({status: 200, message: "data berhasil diedit."})
    } catch (error) {
        return res.json({status: 500, message: "data gagal diedit."})
    }
}

export const DELETE = async (request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    try {
        await deleteData("ulasan", id)
        // const dataRating = await getDataWhere("ulasan", `id_barang`, barangId, 100, 0)
        // const averageRating = dataRating.reduce((sum, data) => sum + data.rating, 0) / dataRating.length
        // const _rating = parseFloat(averageRating.toFixed(1))
        // await updateData("barang", `SET rating = ${_rating } WHERE id=${barangId}`)
        return res.json({status: 200, message: "data berhasil dihapus"})
    } catch (error) {
        return res.json({status: 200, message: "data gagal dihapus"})
        
    }
}