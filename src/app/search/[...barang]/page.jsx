import ListBarang from "@/components/listBarang"
import TrendingBarang from "@/components/listBarang/trending"
import getData from "@/lib/api-libs/api"
import Pagination from "@/components/pagination"
import { getServerSession } from "next-auth"
import UserLayout from "@/app/layout/userLayout"


const Page = async ({ params }) => {
    const session = await getServerSession()
    const page = parseInt(params.barang[0])
    const search = params.barang[1]
    const searchBrg = search.replaceAll("%20", " ")
    const user = await getData("/user", `?email=${session.user.email}`)
    const barang = await getData("/barang", `?search=${searchBrg}&limit=18&page=${page >= 1 ? page : 1}`)

    return (
        <UserLayout currentUser={user} >
            <div className="mt-7 md:mt-5 w-full flex flex-col md:flex-row gap-x-5">
                <div className="w-full px-2 md:px-0 mt-7 md:mt-0">
                    {barang.status !== 200
                        ? <div>
                            <h1 className="mt-5">items not found</h1>
                        </div>
                        : <>
                            <section className="mt-5">
                                <ListBarang api={barang} title={`Pencarian ${searchBrg}`} />
                            </section>
                        </>}
                </div>
            </div>
            {barang.status !== 200
                ? null
                : <div className="w-full my-5">
                    <Pagination page={page >= 1 ? page : 1} lastPage={barang.pagination.lastVisiblePage} url={`/search/`} display={false} search={`/${searchBrg}`} />
                </div>}
        </UserLayout>
    )
}

export default Page