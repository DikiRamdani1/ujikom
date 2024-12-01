
import { Arvo } from "next/font/google"
import { getServerSession } from "next-auth"
import UserLayout from "../layout/userLayout"
import ContentPeminjaman from "@/components/tab/content"
import { getData } from "@/lib/api-libs/api"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async () => {
    const session = await getServerSession()
    const user = await getData("/user", `?email=${session.user.email}`)
    const pinjaman = await getData("/peminjaman", `?userId=${user.data[0].id}&status=borrowed`)
    const pinjamanPending = await getData("/peminjaman", `?userId=${user.data[0].id}&status=pending`)

    return (
        <UserLayout currentUser={user} >
            <div className="w-full" >
                <h1 className={`${arvo.className} text-3xl opacity-90 line-clamp-1`}>Peminjaman Barang</h1>
                <ContentPeminjaman api1={pinjaman} api2={pinjamanPending} title1={"Dipinjam"} title2={"Menunggu"} tabName={"landing"} />
            </div>
        </UserLayout>
    )
}

export default Page