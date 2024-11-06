import getData from "@/lib/api-libs/api"
import UserLayout from "../layout/userLayout"
import { getServerSession } from "next-auth"
import { BsBoxFill } from "react-icons/bs"
import { HiClipboardList } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import PieChart from "@/components/chart/pieChart"
import BarChart from "@/components/chart/barChart"
import Pagination from "@/components/pagination"
import ButtonHapus from "@/components/modal/hapus/button"
import ButtonKategori from "@/components/modal/buttonKategori"


const Page = async ({ params }) => {
    const page = parseInt(params.page)
    const session = await getServerSession()
    const user = await getData("/user", `?email=${session.user.email}`)
    const kategori = await getData("/kategori", '')

    return (
        <UserLayout currentUser={user} >
            <div className="w-full my-5" >
                <div className="w-full flex flex-col md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5" >
                    <div className="w-full h-28 flex items-center bg-base-100 shadow rounded-lg" >
                        <div className="ml-10 flex items-center gap-x-3">
                            <div className="p-5 rounded-full bg-purple-500/40" >
                                <BsBoxFill className="text-2xl text-purple-500 opacity-70" />
                            </div>
                            <div>
                                <h1 className="text-3xl opacity-90 font-medium" >77+</h1>
                                <h6>stock barang</h6>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-28 flex items-center bg-base-100 shadow rounded-lg" >
                        <div className="ml-10 flex items-center gap-x-3">
                            <div className="p-5 rounded-full bg-purple-500/40" >
                                <HiClipboardList className="text-2xl text-purple-500 opacity-70" />
                            </div>
                            <div>
                                <h1 className="text-3xl opacity-90 font-medium" >53+</h1>
                                <h6>peminjaman barang</h6>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-28 flex items-center bg-base-100 shadow rounded-lg" >
                        <div className="ml-10 flex items-center gap-x-3">
                            <div className="p-5 rounded-full bg-purple-500/40" >
                                <FaUserCircle className="text-2xl text-purple-500 opacity-70" />
                            </div>
                            <div>
                                <h1 className="text-3xl opacity-90 font-medium" >27+</h1>
                                <h6>Pengguna</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5 flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-5" >
                    <div className="w-full md:w-[70%] min-h-[200px] h-auto p-5 pl-0 bg-base-100 rounded-lg" >
                        <BarChart />
                    </div>
                    <div className="w-full md:w-auto min-h-[200px] h-auto p-5 flex justify-center bg-base-100 rounded-lg" >
                        <div>
                            <PieChart />
                        </div>
                    </div>
                </div>
                <div className="w-full p-5 my-5 bg-base-100 rounded-lg" >
                    <div className="overflow-x-auto">
                        <div className="flex justify-between" >
                            <h1 className={`md:text-3xl opacity-90 line-clamp-1`}>Daftar Kategori Barang</h1>
                            <ButtonKategori />
                        </div>
                        <table className="table mt-3">
                            <thead>
                                <tr className="text-black/90 text-sm">
                                    <th>NO</th>
                                    <th>NAMA</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kategori.status == 200
                                    ? kategori.data.map((data, index) => {
                                        return (
                                            <tr key={index} className="hover font-medium">
                                                <th>{index + 1}</th>
                                                <td>{data.nama}</td>
                                                <td>
                                                    <div className="flex gap-x-3" >
                                                        <ButtonHapus id={data.id} title={false} url={"kategori"} currentBy={"id"} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* {kategori.status == 200
                        ? <Pagination page={page} lastPage={kategori.pagination.lastVisiblePage} url={"/admin/"} display={true} search={`/`} />
                        : null} */}
                </div>
            </div>
        </UserLayout>
    )
}

export default Page