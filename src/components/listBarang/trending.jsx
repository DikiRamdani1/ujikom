import { Arvo } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { IoStarSharp } from "react-icons/io5"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const TrendingBarang = ({ api, title }) => {
    return (
        <div className="w-full md:p-5 md:bg-base-100 sticky top-[70px] rounded-lg md:shadow-2xl">
            <div className="ml-2 md:ml-0">
                <h1 className={`${arvo.className} text-3xl opacity-90`}>{title}</h1>
            </div>
            <div className="w-full flex md:flex-col gap-x-3 md:gap-x-2 relative overflow-x-scroll md:overflow-x-visible hide-scrollbar">
                {api.data.map((data, index) => {
                    return (
                        <Link key={index} href={`/barang/${data.barang_id}`}>
                            <div className="mt-3 flex gap-x-2 hover:bg-purple-500 rounded-lg cursor-pointer transition">
                                <div className="w-48 h-72 md:w-16 md:h-20 bg-purple-500 rounded-lg overflow-hidden">
                                    <Image className="w-full h-full object-cover" src={data.image} alt={`gambar ${data.nama}`} width={400} height={600} />
                                </div>
                                <div className="w-3/4 hidden md:block">
                                    <h3 className="mt-3 text-lg line-clamp-1 opacity-80">{data.nama}</h3>
                                    <div className="flex gap-x-1">
                                        <IoStarSharp className="text-yellow-400" />
                                        {data.rating == 0
                                            ? null
                                            : <h6 className="text-sm opacity-50">{data.rating}</h6>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default TrendingBarang