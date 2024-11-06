import {
    addData,
    deleteData,
    getData,
    getDataLike,
    getDataOrderBy,
    getDataTerbaru,
    getDataWhere,
    joinTable,
    pagination,
    searchData,
    updateData
} from "@/lib/connect/service"
import {
    saveImage
} from "@/lib/firebase/service"
import {
    NextResponse as res
} from "next/server"

export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const limit = typeof searchParams.get("limit") == "string" ? parseInt(searchParams.get("limit")) : 30
    const page = typeof searchParams.get("page") == "string" ? parseInt(searchParams.get("page")) : 1
    const id = searchParams.get("id")
    const nama = searchParams.get("nama")
    const kategori = searchParams.get("kategori")
    const order_by = searchParams.get("order_by")
    const search = searchParams.get("search")
    const offset = (page - 1) * limit

    if (id) {
        const data = await getDataWhere("barang", "id", id, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("barang", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    } else if (nama) {
        const data = await getDataLike("barang", "nama", nama, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                messgae: "data tidak ditemukan."
            })
        }
        const paginate = await pagination("barang", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    } else if (kategori) {
        const data = await joinTable(`SELECT barang.id AS barang_id, barang.nama, barang.image, barang.rating, detail_kategori.nama AS nama_kategori FROM kategori INNER JOIN barang ON kategori.id_barang = barang.id INNER JOIN detail_kategori ON kategori.id_kategori = detail_kategori.id WHERE kategori.id_kategori=${kategori} LIMIT ${limit} OFFSET ${offset}`)
        if (!data) {
            return res.json({
                status: 404,
                message: "data tidak ditemukan."
            })
        }
        const paginate = await pagination("kategori", limit, page, data.length, `INNER JOIN barang ON kategori.id_barang = barang.id INNER JOIN detail_kategori ON kategori.id_kategori = detail_kategori.id WHERE kategori.id_kategori=${kategori}`)
        return res.json({
            status: 200,
            messgae: "data berhasil ditemukan",
            data: data,
            pagination: paginate
        })
    } else if (order_by) {

        const data = await getDataOrderBy("barang", order_by, limit, offset)

        if (!data) {
            return res.json({
                status: 500,
                message: "data tidak ditemukan."
            })
        }
        const paginate = await pagination("barang", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    } else if (search) {
        const data = await searchData(`SELECT id AS barang_id, nama, merk, rating, stock, image, deskripsi, createdAt FROM barang WHERE nama LIKE '%${search}%'`, limit, offset)
        if (!data) {
            return res.json({
                status: 500,
                message: "data tidak ditemukan."
            })
        }
        const paginate = await pagination("barang", limit, page, data.length, `WHERE nama LIKE '%${search}%'`)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan.",
            data: data,
            pagination: paginate
        })
    }

    try {
        const data = await getData("barang", limit, offset)
        if (data.length !== 0) {
            const paginate = await pagination("barang", limit, page, data.length)
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
    const form = await request.formData()
    const nama = form.get("nama")
    const merk = form.get("merk")
    const stock = parseInt(form.get("stock"))
    const image = form.get("image")
    const kategori = form.get("kategori")
    const deskripsi = form.get("deskripsi")

    try {
        const imageUrl = await saveImage(image)
        const id_barang = await addData("barang", `(null, '${nama}', '${merk}', 0, '${stock}', '${imageUrl}', '${deskripsi}', NOW())`)
        await addData("kategori", `(null, ${id_barang}, ${kategori})`)
        return res.json({
            status: 200,
            message: "data berhasil ditambahkan."
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal ditambahkan."
        })
    }
}

export const PUT = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const data = await request.formData()
    const id = searchParams.get("id")
    const nama = data.get("nama")
    const stock = data.get("stock")
    const merk = data.get("merk")
    const image = data.get("image")
    const deskripsi = data.get("deskripsi")

    if (image == null) {
        try {
            await updateData("barang", `SET nama='${nama}', stock=${stock}, merk='${merk}', deskripsi='${deskripsi}' WHERE id=${id}`)
            return res.json({
                status: 200,
                message: "data berhasil diperbarui a"
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "data gagal diperbarui"
            })
        }
    }

    try {
        const imageUrl = await saveImage(image)
        await updateData("barang", `SET nama='${nama}', stock=${stock}, merk='${merk}', image='${imageUrl}', deskripsi='${deskripsi}' WHERE id=${id}`)
        return res.json({
            status: 200,
            message: "data berhasil diperbarui"
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal diperbarui"
        })
    }
}

export const DELETE = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const id = searchParams.get("id")

    try {
        await deleteData("barang", id)
        return res.json({
            status: 200,
            message: "data berhasil dihapus"
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal dihapus"
        })
    }
}