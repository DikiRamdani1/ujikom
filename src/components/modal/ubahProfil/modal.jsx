'use client'
import { Arvo } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { FaImage } from "react-icons/fa"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const ModalUbahProfil = ({ display, setDisplay, user }) => {
    const [nama, setNama] = useState(user.data[0].nama)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleUbahProfil = async () => {
        setLoading(true)
            const formData = new FormData()
            const namaData = formData.append('nama', nama)
            const imageData = formData.append('image', image)
            try {
                const response = await fetch(`/api/user?id=${user.data[0].id}`, {
                    method: 'PUT',
                    body: formData
                })

                const data = await response.json()
                window.location.reload()
            } catch (error) {
                console.log(error)
        }
    }
    const handle = (e) => {
        if (nama !== user.data[0].nama || image !== null) {
            if (e.key == 'Enter' || e.type == 'click') {
                if (nama !== '') {
                    handleUbahProfil()
                }
            }
        }
    }
    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <span className={`loading loading-infinity loading-lg ${loading ? 'block' : 'hidden'}`}></span>
            <div className={`w-72 h-auto p-3 ${display && !loading ? 'flex flex-col' : 'hidden'} bg-base-100 rounded-lg modalPinjamBrg`}>
                <div className="flex flex-col gap-y-3">
                    <h1 className={`${arvo.className} mt-3 text-3xl opacity-90 line-clamp-1`}>Ubah Profil</h1>
                    <div className="flex items-center justify-between gap-x-2" >
                        <Image className="w-24 h-24 object-cover" src={user.data[0].image} alt="gambar user" width={100} height={100} />
                        <FaArrowRight className="text-3xl opacity-90" />
                        <label className="w-24 h-24 flex flex-col items-center cursor-pointer" htmlFor="image">
                            <FaImage className="text-7xl" />
                            <span>Pilih Gambar</span>
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} className="hidden" type="file" id="image" accept=".png, .jpg, .jpeg" />
                    </div>
                    <div className="flex flex-col">
                        <label className={`${nama == '' ? 'text-red-600' : null}`} htmlFor="nama">Nama</label>
                        <input onChange={(e) => setNama(e.target.value)} onKeyDown={handle} value={nama} className={`p-1 border-2 ${nama == '' ? 'border-red-600' : 'border-gray-700'} outline-none`} type="text" id="nama" />
                    </div>
                    <div className="flex gap-x-3" >
                        <button onClick={handle} className={`w-2/4 py-1 text-center ${nama !== user.data[0].nama || image !== null ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-500/40'}  rounded-lg`} >Ubah</button>
                        <button className="w-2/4 py-1 text-center bg-red-500 hover:bg-red-600 rounded-lg" type="button" onClick={() => setDisplay(false)} >Batal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUbahProfil