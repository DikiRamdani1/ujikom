'use client'

import Image from "next/image"
import Link from "next/link"
import { IoStarSharp } from "react-icons/io5"
import { useRef, useEffect, useState } from "react"
import { Arvo } from "next/font/google"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const ListBarangSlider = ({ api, title, link }) => {
    const caroselContainer = useRef(null)
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        if (scroll !== 0) {
            caroselContainer.current.scrollTo({
                left: scroll,
                behavior: 'smooth'
            })
        }
    }, [scroll])

    return (
        <div className="w-full relative" >
            <div className="w-full flex items-center justify-between" >
                <h1 className={`${arvo.className} text-3xl opacity-90`}>{title}</h1>
                <Link href={`/kategori/${link}/1`}>
                    <FaArrowRight className="text-3xl opacity-90" />
                </Link>
            </div>
            <div ref={caroselContainer} className="w-full h-96 md:h-64 mt-3 flex items-center relative overflow-hidden" >
                <div className="flex gap-x-3 absolute transition" >
                    {api.data.map((data, index) => {
                        return (
                            <Link key={index} href={`/barang/${data.barang_id}`}>
                                <div className="group w-40 h-80 md:h-60 cursor-pointer">
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
            </div>
            <button onClick={() => {
                const maxScroll = caroselContainer.current.scrollWidth - caroselContainer.current.clientWidth
                if (scroll <= maxScroll) {
                    setScroll(scroll + caroselContainer.current.clientWidth)
                }
            }} className="p-3 absolute top-2/4 right-3 md:-right-2 bg-purple-500 rounded-full" ><FaArrowRight className="text-black opacity-90" /></button>
            <button onClick={() => {
                if (scroll > 0) {
                    setScroll(scroll - caroselContainer.current.clientWidth)
                } else {
                    setScroll(-1)
                }
            }} className="p-3 absolute top-2/4 left-3 md:-left-2 bg-purple-500 rounded-full" ><FaArrowLeft className="text-black opacity-90" /></button>
        </div>
    )
}

export default ListBarangSlider