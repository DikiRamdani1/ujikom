'use client'
import { Arvo } from "next/font/google"
import Image from "next/image"
import { useState } from "react"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const UpdateModal = ({ display, setDisplay, data, status }) => {
    const [loading, setLoading] = useState(false)
    const [statusPinjam, setStatusPinjam] = useState(false)

    const handle = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/peminjaman/konfirmasi?id=${data.id}&status=${status}`, {
                method: 'PUT'
            })
            const dataRes = await response.json()
            if (dataRes.status == 200) {
                window.location.reload()
            } else {
                setLoading(false)
                setStatusPinjam(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <span className={`loading loading-infinity loading-lg ${loading ? 'block' : 'hidden'}`}></span>
            <div className={`w-full md:w-[600px] h-auto md:h-64 p-3 ${display ? !loading && !statusPinjam ? 'flex md:flex-row' : 'hidden' : 'hidden'} gap-x-3 bg-base-100 rounded-lg modalPinjamBrg`}>
                <div className="w-[30%] h-full bg-purple-500">
                    <Image className="w-full h-full object-cover" src={data.image} alt="gambar item" width={200} height={300} />
                </div>
                <div className="w-[70%]">
                    <h1 className={`${arvo.className} md:mt-3 text-xl md:text-3xl opacity-90 line-clamp-1`}>{data.nama_barang}</h1>
                    <h6 className="text-lg">stock {data.stock}</h6>
                    <h6 className="text-lg">Tanggal Pinjam {data.tgl_pinjam}</h6>
                    <h6 className="text-lg">Tanggal Kembali {data.tgl_kembali}</h6>
                    <div className="w-auto mt-2 md:mt-4 flex gap-x-3">
                        <button onClick={handle} className="px-10 py-1 bg-purple-500 border-none rounded-lg text-black font-medium hover:bg-purple-600" >Oke</button>
                        <button onClick={() => setDisplay(false)} className="px-10 py-1 bg-red-500 border-none rounded-lg text-black font-medium hover:bg-red-600" >Batal</button>
                    </div>
                </div>
            </div>
            <div className={`w-full md:w-auto h-auto p-5 ${display ? !loading && statusPinjam ? 'flex flex-col items-center' : 'hidden' : 'hidden'} gap-x-3 bg-base-100 rounded-lg modalPinjamBrg`}>
            <h1 className={`text-lg opacity-90 text-center`}>stock barang tidak mencukupi</h1>
            <button onClick={() => {
                setDisplay(false)
                setStatusPinjam(false)
            }} className="w-40 px-5 py-1 mt-3 bg-purple-500 border-none rounded-lg text-black font-medium hover:bg-purple-600" >Oke</button>
            </div>
        </div>
    )
}

export default UpdateModal