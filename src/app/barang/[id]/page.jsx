import { Arvo } from "next/font/google"
import Image from "next/image"
import { IoStarSharp } from "react-icons/io5"
import TrendingBarang from "@/components/listBarang/trending"
import Ulasan from "@/components/ulasan"
import ButtonPinjam from "@/components/modal/pinjamBarang/button"
import { getServerSession } from "next-auth"
import UserLayout from "@/app/layout/userLayout"
import ButtonFavorite from "@/components/favorite/button"
import { getData } from "@/lib/api-libs/api"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async ({ params }) => {
    const session = await getServerSession()

    const idBrg = params.id

    const user = await getData("/user", `?email=${session.user.email}`)
    const barang = await getData("/barang", `?id=${idBrg}`)
    const ulasan = await getData("/ulasan", `?barangId=${idBrg}`)
    const ulasanUser = await getData("/ulasan", `?barangId=${idBrg}&userId=${user.data[0].id}`)
    const favorite = await getData("/barang/favorite", `?userId=${user.data[0].id}&barangId=${idBrg}`)
    const barangLainnya = await getData("/barang", "?order_by=rating&limit=12")
    const _barangLainnya = barangLainnya.data.filter(brg => brg.id != idBrg)

    return (
        <UserLayout currentUser={user}>
            <div className="w-full md:px-5 mb-5 animeOpacity">
                <div className="w-full relative">
                    <div className="mt-5 md:mt-0 w-full h-auto sm:h-48 md:h-64 p-2 sm:p-0 hidden md:flex rounded-lg bg-base-100 absolute shadow-lg">
                        <div className="w-[60%] h-full hidden sm:flex items-center justify-center absolute top-0 right-0 rounded-lg overflow-hidden">
                            <div id="bg-barang" className={`w-full h-full bg-cover`} style={{ backgroundImage: `url(${barang.data[0].image})` }} ></div>
                            <div className="w-full h-full bg-gradient-to-r from-base-100 to-base-100/40 absolute top-0 left-0"></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full md:mt-5 flex">
                            <div className="w-full relative md:mt-24 md:ml-5 lg:ml-20">
                                <div className="flex flex-col md:flex-row gap-x-5">
                                    <div className="w-full h-[50vh] md:w-64 md:h-80 md:rounded-lg relative overflow-hidden bg-purple-500">
                                        <Image className="w-full h-full object-cover" src={barang.data[0].image} alt={`gambar ${barang.data[0].nama}`} width={500} height={700} />
                                        <div className="w-full h-full md:hidden bg-gradient-to-t from-base-300 to-base-300/40 absolute top-0"></div>
                                    </div>
                                    <div className="w-full md:w-2/4 px-2">
                                        <h1 className={`mt-3 text-3xl opacity-90 line-clamp-1`}>{barang.data[0].nama}</h1>
                                        <div className="mt-2 flex flex-wrap gap-2 md:gap-x-5 items-center">
                                            <div className="px-3 bg-base-100 md:bg-base-300 rounded-full shadow-lg">
                                                <h6 className="opacity-70 text-xs md:text-sm lg:text-base">Stock {barang.data[0].stock}</h6>
                                            </div>
                                            <div className="px-3 bg-base-100 md:bg-base-300 rounded-full shadow-lg">
                                                <h6 className="opacity-70 text-xs md:text-sm lg:text-base">Merk {barang.data[0].merk}</h6>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-1 mt-2">
                                            <IoStarSharp className="text-yellow-400" />
                                            {barang.data[0].rating == 0
                                                ? null
                                                : <h6 className="text-sm opacity-50">{barang.data[0].rating}</h6>
                                            }
                                        </div>
                                        <div className="flex gap-x-5 mt-2">
                                            <ButtonPinjam barang={barang} user={user} />
                                            <ButtonFavorite favorite={favorite} user={user} barang={idBrg} />
                                        </div>
                                        <div className="mt-10">
                                            <h1 className="text-xl font-semibold opacity-90">Deskripsi</h1>
                                            <p className="mt-1 opacity-70">{barang.data[0].deskripsi}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-14 flex flex-col md:flex-row md:justify-between gap-x-5">
                                    <div className="w-full md:w-[70%]  px-2 md:px-0">
                                        <Ulasan api={ulasan} ulasanUser={ulasanUser} user={user} barangId={idBrg} />
                                    </div>
                                    <div className="w-fulll md:w-[30%] mt-14 md:mt-0">
                                        <TrendingBarang api={{ data: _barangLainnya }} title={"Trending"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default Page