import {
    NextResponse as res
} from "next/server"
import {
    addData,
    deleteData,
    getData,
    getDataWhere,
    joinTable,
    pagination,
    searchData
} from "@/lib/connect/service"

export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const limit = typeof searchParams.get("limit") == "string" ? parseInt(searchParams.get("limit")) : 30
    const page = typeof searchParams.get("page") == "string" ? parseInt(searchParams.get("page")) : 1
    const id = searchParams.get('id')
    const userId = searchParams.get('userId')
    const barangId = searchParams.get('barangId')
    const status = searchParams.get('status')
    const nama = searchParams.get('namaUser')
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')
    const offset = (page - 1) * limit


    if (id) {
        const data = await getDataWhere('peminjaman', 'id', id, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("peminjaman", limit, page, data.length)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    } else if (userId && barangId) {
        const data = await searchData(`SELECT * FROM peminjaman WHERE id_user='${userId}' AND id_barang='${barangId}' AND status != 'returned'`, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("peminjaman", limit, page, data.length)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    } else if (userId) {
        if (status) {
            const data = await joinTable(`SELECT barang.id AS barang_id, barang.nama AS nama_barang, barang.image, barang.rating, user.nama, peminjaman.id, peminjaman.stock, peminjaman.tgl_pinjam, peminjaman.tgl_kembali FROM peminjaman INNER JOIN barang ON peminjaman.id_barang = barang.id INNER JOIN user ON peminjaman.id_user = user.id WHERE id_user = ${userId} AND status = '${status}' ORDER BY peminjaman.createdAt DESC LIMIT ${limit} OFFSET ${offset}`)
            if (!data) {
                return res.json({
                    status: 404,
                    message: "data gagal ditemukan."
                })
            }
            const paginate = await pagination("peminjaman", limit, page, data.length)
            return res.json({
                status: 200,
                message: 'data berhasil ditemukan',
                data: data,
                pagination: paginate
            })
        }
        const data = await joinTable(`SELECT barang.nama, barang.image, peminjaman.id, peminjaman.stock, peminjaman.tgl_kembali FROM peminjaman INNER JOIN barang ON peminjaman.id_barang = barang.id WHERE id_user = ${userId} ORDER BY peminjaman.createdAt DESC LIMIT ${limit} OFFSET ${offset}`)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan.a"
            })
        }
        const paginate = await pagination("peminjaman", limit, page, data.length)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    } else if (barangId) {
        const data = await getDataWhere('peminjaman', 'id_barang', barangId, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("peminjaman", limit, page, data.length)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    } else if (status) {
        const data = await joinTable(`SELECT barang.id As barang_id, barang.nama AS nama_barang, barang.image, barang.rating, user.nama AS nama_user, user.image AS user_image, peminjaman.id, peminjaman.stock, peminjaman.status, peminjaman.tgl_pinjam, peminjaman.tgl_kembali FROM peminjaman INNER JOIN barang ON peminjaman.id_barang = barang.id INNER JOIN user ON peminjaman.id_user = user.id WHERE ${status == "borrowed_returned" ? `peminjaman.status != 'pending'` : `peminjaman.status = '${status}'`} ${nama == '' || typeof nama == "object" ? '' : `AND user.nama LIKE "%${nama}%"`} ORDER BY peminjaman.createdAt DESC LIMIT ${limit} OFFSET ${offset}`)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }

        const paginate = await pagination("peminjaman", limit, page, data.length, `INNER JOIN user ON peminjaman.id_user = user.id WHERE ${status == "borrowed_returned" ? `peminjaman.status != 'pending'` : `peminjaman.status = '${status}'`} ${nama == '' || typeof nama == "object" ? '' : `AND user.nama LIKE "%${nama}%"`}`)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    } else if (tahun && bulan) {
        const data = await searchData(`SELECT * FROM peminjaman WHERE YEAR(tgl_pinjam) = ${tahun} AND MONTH(tgl_pinjam) = ${bulan} AND peminjaman.status != 'pending'`, 99999999, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }

        const paginate = await pagination("peminjaman", limit, page, data.length, `WHERE YEAR(tgl_pinjam) = ${tahun} AND MONTH(tgl_pinjam) = ${bulan} AND peminjaman.status != 'pending'`)
        return res.json({
            status: 200,
            message: 'data berhasil ditemukan',
            data: data,
            pagination: paginate
        })
    }

    try {
        const data = await getData("peminjaman", limit, offset)
        if (data.length !== 0) {
            const paginate = await pagination("peminjaman", limit, page, data.length)
            return res.json({
                status: 200,
                message: "data berhasil ditemukan",
                data: data,
                pagination: paginate
            })
        }
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal ditemukan"
        })
    }
}

export const POST = async (request) => {
    const data = await request.json()
    const {
        userId,
        barangId,
        stock,
        tglKembali
    } = data

    try {
        const dataPinjam = await searchData(`SELECT * FROM peminjaman WHERE status != 'returned' AND id_user = ${userId}`, 50, 0)
        const jmlPinjamUser = !dataPinjam ? 0 : dataPinjam.reduce((sum, brg) => sum + brg.stock, 0)
        
        if (jmlPinjamUser + stock <= 10) {
            await addData("peminjaman", `(null, '${barangId}', '${userId}', '${stock}', 'pending', NOW(), '${tglKembali}', NOW())`)
            return res.json({
                status: 200,
                message: "data berhasil ditambahkan."
            })
        }
        return res.json({
            status: 400,
            message: "data gagal ditambahkan."
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal ditambahkan."
        })
    }
}

export const DELETE = async (request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    try {
        await deleteData("peminjaman", id)
        return res.json({status: 200, message: "data berhasil dihapus"})
    } catch (error) {
        console.log(error)
        return res.json({status: 500, message: "data gagal dihapus"})
    }
}
