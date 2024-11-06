import {
    pagination,
    randomData
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
    const offset = (page - 1) * limit

    try {
        const data = await randomData("barang", limit, offset)
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
            message: "data gagal ditemukan."
        })
    }
}