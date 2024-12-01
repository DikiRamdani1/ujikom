import ListBarang from "@/components/listBarang"
import TrendingBarang from "@/components/listBarang/trending"
import Pagination from "@/components/pagination"
import { getServerSession } from "next-auth"
import UserLayout from "@/app/layout/userLayout"
import { getData } from "@/lib/api-libs/api"

const Page = async ({ params }) => {
    const session = await getServerSession()
    const page = parseInt(params.page)
    const user = await getData("/user", `?email=${session.user.email}`)
    const barang = await getData("/barang", `?order_by=createdAt&limit=18&page=${page >= 1 ? page : 1}`)
    const barangTrending = await getData("/barang", "?order_by=rating&limit=5")

    return (
        <UserLayout currentUser={user}>
            <div className="mt-7 md:mt-5 w-full flex flex-col md:flex-row gap-x-5">
                <div className="w-full px-2 md:px-0">
                    {barang.status !== 200
                        ? <div>
                            <h1 className="mt-5">Barang tidak ditemukan</h1>
                        </div>
                        : <section className="mt-5">
                            <ListBarang api={barang} title={"Terbaru"} link={false} />
                        </section>}
                </div>
            </div>
            {barang.status !== 200
                ? null
                : <div className="w-full mt-10">
                    <Pagination page={page >= 1 ? page : 1} lastPage={barang.pagination.lastVisiblePage} url={`/terbaru/`} display={false} search={'/'} />
                </div>}
        </UserLayout>
    )
}

export default Page