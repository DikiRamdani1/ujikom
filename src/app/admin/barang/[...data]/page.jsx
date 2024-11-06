import UserLayout from "@/app/layout/userLayout"
import DownloadButton from "@/components/generate/button"
import ButtonHapus from "@/components/modal/hapus/button"
import ButtonTambahBarang from "@/components/modal/tambahBarang/button"
import ButtonUpdateBarang from "@/components/modal/ubahBarang/button"
import Pagination from "@/components/pagination"
import getData from "@/lib/api-libs/api"
import { getServerSession } from "next-auth"
import { Arvo } from "next/font/google"
import Image from "next/image"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async ({ params }) => {
    const page = parseInt(params.data[0])
    const nama = params.data[1] == undefined ? '' : params.data[1]
    const search = nama.replaceAll("%20", " ")
    const session = await getServerSession()
    const user = await getData("/user", `?email=${session.user.email}`)
    const barang = await getData("/barang", `?search=${search}&limit=10&page=${page >= 1 ? page : 1}`)
    const kategori = await getData("/kategori", '')

    return (
        <UserLayout currentUser={user} >
            <div className="w-full p-5 my-5 bg-base-100 rounded-lg shadow-lg" >
                <div className="overflow-x-auto">
                    <div className="flex items-center justify-between" >
                        <h1 className={`${arvo.className} text-3xl opacity-90 line-clamp-1`}>Daftar Barang</h1>
                        <ButtonTambahBarang apiKategori={kategori} />
                    </div>
                    <table className="table mt-3">
                        <thead>
                            <tr className="text-black/90 text-sm">
                                <th>NO</th>
                                <th>GAMBAR</th>
                                <th>NAMA BARANG</th>
                                <th>STOCK</th>
                                <th>MERK</th>
                                <th>RATING</th>
                                <th>DESKRIPSI</th>
                                <th>AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barang.status == 200
                                ? barang.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="hover font-medium">
                                            <th>{index + 1}</th>
                                            <td>
                                                <Image className="w-12 h-12 rounded-lg object-cover" src={data.image} alt="gambar user" width={50} height={50} />
                                            </td>
                                            <td>{data.nama}</td>
                                            <td>{data.stock}</td>
                                            <td>{data.merk}</td>
                                            <td>{data.rating == 0 ? 'tidak ada' : data.rating}</td>
                                            <td>{data.deskripsi}</td>
                                            <td>
                                                <div className="flex gap-x-3" >
                                                    <ButtonUpdateBarang title={"Ubah"} dataBarang={data} />
                                                    <ButtonHapus id={data.id} title={false} url={"barang"} currentBy={"id"} />
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
                {barang.status !== 200
                    ? null
                    : <Pagination page={page} lastPage={barang.pagination.lastVisiblePage} url={"/admin/barang/"} display={true} search={`/${search}`} />
                }
            </div>
        </UserLayout>
    )
}

export default Page