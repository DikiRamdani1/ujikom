import {
    addData,
    getData,
    getDataLike,
    getDataWhere,
    pagination,
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
    const page = typeof searchParams.get("page") == "string" ? parseInt(searchParams.get("page")) : 1
    const limit = typeof searchParams.get("limit") == "string" ? parseInt(searchParams.get("limit")) : 30
    const id = searchParams.get("id")
    const nama = searchParams.get("nama")
    const email = searchParams.get("email")
    const offset = (page - 1) * limit


    if (id) {
        const data = await getDataWhere("user", "id", id, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan.",
                data: null
            })
        }
        const paginate = await pagination("user", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan",
            data: data,
            pagination: paginate
        })
    } else if (nama) {
        const data = await getDataLike("user", "nama", nama, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("user", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan",
            data: data,
            pagination: paginate
        })
    } else if (email) {
        const data = await getDataLike("user", "email", email, limit, offset)
        if (!data) {
            return res.json({
                status: 404,
                message: "data gagal ditemukan."
            })
        }
        const paginate = await pagination("user", limit, page, data.length)
        return res.json({
            status: 200,
            message: "data berhasil ditemukan",
            data: data,
            pagination: paginate
        })
    }

    const data = await getData("user", limit, offset)
    if (data.length !== 0) {
        const paginate = await pagination("user", limit, page, data.length)
        return res.json({
            status: 200,
            message: "mantap",
            data: data,
            pagination: paginate
        })
    }
}

export const POST = async (request) => {
    const data = await request.json()
    const nama = data.nama
    const email = data.email
    const pass = data.password
    const image = data.image
    const role = data.role

    try {
        const addUser = await addData("user", `(null, '${nama}', '${email}', '${pass}','${image}', '${role}')`)
        if (addUser) {
            return res.json({
                status: 200,
                message: "data berhasil ditambahkan."
            })
        }
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
    const id = searchParams.get('id')
    const nama = data.get('nama')
    const image = data.get('image')

    if (image == 'null') {
        try {
            await updateData('user', `SET user.nama = '${nama}' WHERE id = ${id}`)
            return res.json({status: 200, message: 'data berhasil diupdate.'})
        } catch (error) {
            return res.json({status: 500, message: 'data gagal diupdate.'})
        }

    }

    try {
        const imageUrl = await saveImage(image)
        await updateData('user', `SET user.nama = '${nama}', user.image = '${imageUrl}' WHERE id = ${id}`)
        return res.json({status: 200, message: 'data berhasil diupdate.'})
    } catch (error) {
        return res.json({status: 500, message: 'data gagal diupdate.'})
    }
}