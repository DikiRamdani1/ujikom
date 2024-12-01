import ListBarang from "@/components/listBarang"
import Pagination from "@/components/pagination"
import { getServerSession } from "next-auth"
import UserLayout from "@/app/layout/userLayout"
import { getData } from "@/lib/api-libs/api"


const Page = async ({ params }) => {
    const session = await getServerSession()
    const kategori = params.kategori[0]
    const page = parseInt(params.kategori[1])
    const user = await getData("/user", `?email=${session.user.email}`)
    const kategoriData = await getData("/barang", `?kategori=${kategori}&limit=18&page=${page >= 1 ? page : 1}`)

    return (
        <UserLayout currentUser={user} >
            <div className="mt-7 md:mt-5 w-full flex flex-col md:flex-row gap-x-5">
                <div className="w-full px-2 md:px-0 mt-7 md:mt-0">
                    {kategoriData.status !== 200
                        ? <div>
                            <h1 className="mt-5">items not found</h1>
                        </div>
                        : <>
                            <section className="mt-5">
                                <ListBarang api={kategoriData} title={`${kategoriData.data[0].nama_kategori}`} />
                            </section>
                        </>}
                </div>
            </div>
            {kategoriData.status !== 200
                ? null
                : <div className="w-full my-5">
                    <Pagination page={page >= 1 ? page : 1} lastPage={kategoriData.pagination.lastVisiblePage} url={`/kategori/${kategori}/`} display={false} search={'/'} />
                </div>}
        </UserLayout>
    )
}

export default Page