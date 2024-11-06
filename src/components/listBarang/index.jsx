import { Arvo } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { IoStarSharp } from "react-icons/io5"
const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const ListBarang = ({ api, title, link }) => {
    return (
        <>
            <div className={`w-full ${!link ? null : 'flex items-center justify-between'}`} >
                <h1 className={`${arvo.className} text-3xl opacity-90 line-clamp-1`}>{title}</h1>
                {!link
                    ? null
                    : <Link href={`/${link}/1`}>
                        <FaArrowRight className="text-3xl opacity-90" />
                    </Link>}
            </div>
            <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {api.data.map((data, index) => {
                    return (
                        <Link key={index} href={`/barang/${data.barang_id}`}>
                            <div className="group w-full h-80 md:h-80 cursor-pointer">
                                <div className="w-full h-[90%] md:h-[80%] relative rounded-lg overflow-hidden">
                                    <Image className="w-full h-full object-cover group-hover:scale-105" src={data.image} alt={`gambar ${data.nama}`} width={500} height={700} />
                                    <div className="px-1 py-0.5 flex gap-x-1 bg-purple-500 absolute right-0 top-0 rounded-es-lg">
                                        <IoStarSharp className="text-yellow-400" />
                                        {data.rating == 0
                                            ? null
                                            : <h6 className="text-sm text-black">{data.rating}</h6>
                                        }
                                    </div>
                                </div>
                                <h1 className="mt-1 line-clamp-2 opacity-80">{data.nama}</h1>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListBarang