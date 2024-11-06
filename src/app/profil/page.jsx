import { getServerSession } from "next-auth"
import getData from "@/lib/api-libs/api"
import { Arvo } from "next/font/google"
import handleSizePhotoUser from "@/utils/photoUserSize"
import Image from "next/image"
import { GiNotebook } from "react-icons/gi"
import ContentPeminjaman from "@/components/tab/content"
import UserLayout from "../layout/userLayout"
import ButtonUbahProfil from "@/components/modal/ubahProfil/button"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async () => {
    const session = await getServerSession()
    const user = await getData("/user", `?email=${session.user.email}`)
    const favorite = await getData("/barang/favorite", `?userId=${user.data[0].id}`)
    const pinjamanSelesai = await getData("/peminjaman", `?userId=${user.data[0].id}&status=returned`)
    const largeBg = handleSizePhotoUser(user.data[0].image, 600)

    return (
        <UserLayout currentUser={user} >
            <div className="w-full mt-5">
                <div className="w-full h-64 relative overflow-hidden rounded-lg bg-base-100" >
                    <div className="w-2/5 h-full absolute top-0 right-0" >
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${largeBg})` }} ></div>
                        <div className="w-full h-full bg-gradient-to-r from-base-100 to-base-100/40 absolute top-0 left-0"></div>
                    </div>
                    <div className="w-[90%] h-full md:ml-5 lg:ml-20 flex items-center gap-x-3" >
                        <Image className="w-40 h-40 object-cover rounded-full" src={handleSizePhotoUser(user.data[0].image, 200)} alt="gambar user" width={300} height={300} />
                        <div>
                            <h1 className={`${arvo.className} mt-3 text-3xl opacity-90 line-clamp-1`}>{user.data[0].nama}</h1>
                            <ButtonUbahProfil api={user} />
                        </div>
                    </div>
                </div>
                    <ContentPeminjaman api1={pinjamanSelesai} api2={favorite} title1={"Selesai"} title2={"Favorite"} tabName={"potrait"} />
            </div>
        </UserLayout>
    )
}

export default Page