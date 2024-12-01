import { getServerSession } from 'next-auth'
import ListBarang from "@/components/listBarang"
import { Arvo } from "next/font/google"
import Image from "next/image"
import ListBarangSlider from "@/components/listBarang/slider"
import UserLayout from './layout/userLayout'
import { getData } from '@/lib/api-libs/api'

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Page = async () => {
  const session = await getServerSession()
  const user = await getData("/user", `?email=${session.user.email}`)
  const barang = await getData("/barang/random", "?limit=18")
  const barangNew = await getData("/barang", "?order_by=createdAt&limit=18")
  const bolaFutsal = await getData("/barang", `?kategori=9&limit=15`)

  return (
      <UserLayout currentUser={user} >
        <div className="px-2 md:px-0 relative">
          <div className="mt-5 md:mt-5 w-full h-auto sm:h-48 md:h-64 p-2 sm:p-0 flex flex-col-reverse md:flex-row items-center md:items-start rounded-lg md:bg-base-100 relative overflow-hidden md:shadow-lg">
            <div className="w-full sm:w-[60%] h-full flex items-center">
              <h1 className={`${arvo.className} sm:ml-3 md:ml-9 text-xl sm:text-2xl md:text-3xl opacity-90 leading-10 text-center`}>
                Dapatkan barang-barang dengan harga gratis dan kualitas terjamin hanya di <span className="text-purple-500">Parka</span>.
              </h1>
            </div>
            <div className="w-[40%] h-full flex items-center justify-center">
              <Image
                className="w-44 h-44 md:w-64 md:h-64 md:mb-3"
                src={"/images/rorojump-removebg-preview.png"}
                alt="gambar hero"
                width={300}
                height={300}
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-7 md:mt-5 w-full flex flex-col-reverse md:flex-row gap-x-5">
          {/* <div className="w-full px-2 md:px-0 mt-7 md:mt-0 flex flex-col gap-y-5">
            <section>
              <ListBarang api={barang} title={"Barang"} link={false} />
            </section>
            <section>
              <ListBarangSlider api={bolaFutsal} title={"Bola Futsal"} link={'9'} />
            </section>
            <section>
              <ListBarang api={barangNew} title={"Terbaru"} link={"terbaru"} />
            </section>
          </div> */}
        </div>
      </UserLayout>
  )
}

export default Page
