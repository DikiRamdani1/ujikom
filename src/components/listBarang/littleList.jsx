import { Arvo } from "next/font/google"
import Image from "next/image"
import { FaBoxOpen } from "react-icons/fa"
import { IoMdClock } from "react-icons/io"
import ButtonHapus from "../modal/hapus/button"
import getRemainingTime from "@/utils/time-limit"
import ButtonPerpanjang from "../modal/perpanjang/button"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const LittleList = ({ api, apiName}) => {
    return (
        <div className="w-full mt-5 grid md:grid-cols-3 gap-5" >
            {api.data.map((data, index) => {
                const time = getRemainingTime(data.tgl_kembali)
                return (
                    <div key={index} className="h-44 flex bg-base-100 relative overflow-hidden rounded-lg" >
                        <div className="w-[40%] h-full p-2 " >
                            <Image className="w-full h-full object-cover" src={data.image} alt="gambar barang" width={100} height={100} />
                        </div>
                        <div className="py-2 pr-2 flex flex-col justify-between" >
                            <div>
                                <h1 className={`${arvo.className} md:mt-3 text-lg md:text-xl opacity-90 line-clamp-1`}>{data.nama_barang}</h1>
                                <div className="w-auto flex items-center gap-x-1" >
                                    <IoMdClock className="text-lg opacity-90" />
                                    <h6 className={`${time == 'habis' ? 'text-red-600' : null} opacity-70`} >waktu {time}</h6>
                                </div>
                                <div className="w-auto flex items-center gap-x-1" >
                                    <FaBoxOpen className="text-lg opacity-90" />
                                    <h6 className="opacity-70" >jumlah dipinjam {data.stock}</h6>
                                </div>
                            </div>
                            {apiName == 'borrowed'
                            ? <ButtonPerpanjang />
                            : <ButtonHapus id={data.id} title={'Batal'} url={"peminjaman"} currentBy={"id"} />
                        }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default LittleList