import getData from "@/lib/api-libs/api"
import { getServerSession } from "next-auth"
import UserLayout from "@/app/layout/userLayout"
import { Arvo } from "next/font/google"
import Image from "next/image"
import ButtonUpdate from "@/components/modal/ubah/button"
import Pagination from "../../../../components/pagination"
import DownloadButton from "@/components/generate/button"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async ({ params }) => {
    const session = await getServerSession()
    const page = parseInt(params.data[0])
    const nama = params.data[1] == undefined ? '' : params.data[1]
    const search = nama.replaceAll("%20", " ")
    const user = await getData("/user", `?email=${session.user.email}`)
    const peminjaman = await getData("/peminjaman", `?namaUser=${search}&status=borrowed_returned&limit=13&page=${page >= 1 ? page : 1}`)
    const currentTimestamp = new Date().getTime()

    return (
        <UserLayout currentUser={user} >
            <div className="w-full p-5 my-5 bg-base-100 rounded-lg" >
                <div className="flex items-center justify-between" >
                    <h1 className={`${arvo.className} text-3xl opacity-90 line-clamp-1`}>Peminjaman Barang</h1>
                    <DownloadButton />
                </div>
                <div className="overflow-x-auto">
                    <table className="table mt-3">
                        <thead>
                            <tr className="text-black/90 text-sm">
                                <th>NO</th>
                                <th>IMAGE</th>
                                <th>NAMA</th>
                                <th>NAMA BARANG</th>
                                <th>STOCK</th>
                                <th>AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peminjaman.status == 200
                                ? peminjaman.data.map((data, index) => {
                                    const tglKembali = new Date(data.tgl_kembali).getTime();
                                    return (
                                        <tr key={index} className={`hover font-medium ${data.status == "returned" ? null : currentTimestamp > tglKembali ? "text-red-500" : null}`}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <Image className="w-12 h-12 rounded-lg object-cover" src={data.user_image} alt="gambar user" width={50} height={50} />
                                            </td>
                                            <td>{data.nama_user}</td>
                                            <td>{data.nama_barang}</td>
                                            <td>{data.stock}</td>
                                            <td>
                                                <div className="flex gap-x-3" >
                                                    {data.status == "returned"
                                                        ? <h6>selesai</h6>
                                                        : <ButtonUpdate title={"konfirm"} dataPinjam={data} setStatus={"returned"} />
                                                    }
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
                {peminjaman.status == 200
                    ? <Pagination page={page} lastPage={peminjaman.pagination.lastVisiblePage} url={"/admin/peminjaman/"} display={true} search={`/${search}`} />
                    : null}
            </div>
        </UserLayout>
    )
}

export default Page