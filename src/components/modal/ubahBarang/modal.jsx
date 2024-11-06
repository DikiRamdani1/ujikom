'use client'
import { Arvo } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
import { FaArrowRight, FaImage } from "react-icons/fa"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const UpdateModalBarang = ({ display, setDisplay, data }) => {
    const [image, setImage] = useState(null)
    const [nama, setNama] = useState(data.nama)
    const [stock, setStock] = useState(data.stock)
    const [deskripsi, setDeskripsi] = useState(data.deskripsi)
    const [merk, setMerk] = useState(data.merk)
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("nama", nama)
        formData.append("stock", stock)
        formData.append("merk", merk)
        if (image) {
            formData.append("image", image)
        }
        formData.append("deskripsi", deskripsi)


        if (nama !== data.nama || stock !== data.stock || merk !== data.merk || deskripsi !== data.deskripsi || image !== null) {
            try {
                const response = await fetch(`/api/barang?id=${data.id}`, {
                    method: 'PUT',
                    body: formData
                })
                if (response.ok) {
                    window.location.reload()
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <span className={`loading loading-infinity loading-lg ${loading ? 'block' : 'hidden'}`}></span>
            <div className={`w-96 h-auto p-3 bg-base-100 rounded-lg ${display || !loading ? 'flex flex-col' : 'hidden'} modalPinjamBrg`}>
                <h1 className={`${arvo.className} mt-3 text-3xl opacity-90`}>Ubah Barang</h1>

                <div className="flex items-center justify-between gap-x-2 mt-3">
                    {/* <Image className="w-24 h-24 object-cover" src={data.image} alt="gambar user" width={100} height={100} />
                    <FaArrowRight className="text-3xl opacity-90" />
                    <label className="w-24 h-24 flex flex-col items-center cursor-pointer" htmlFor="imageUbah">
                        <FaImage className="text-7xl" />
                        <span>Pilih Gambar</span>
                    </label>
                    <input
                        type="file"
                        id="imageUbah"
                        accept=".png, .jpg, .jpeg"
                        className="hidden"
                        onChange={handleImageChange}
                    /> */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="" />
                </div>

                <div className="mt-4">
                    <span>Stock</span>
                    <div className="flex">
                        <button
                            onClick={() => setStock(stock <= 0 ? 0 : stock - 1)}
                            className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-r-0">
                            -
                        </button>
                        <div className="w-14 h-6 flex items-center justify-center text-xs border-2 border-base-300">{stock}</div>
                        <button
                            onClick={() => setStock(stock + 1)}
                            className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-l-0">
                            +
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex flex-col">
                    <label className={`${!nama ? 'text-red-600' : ''}`} htmlFor="nama">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className={`p-1 border-2 ${!nama ? 'border-red-700' : ''} outline-none`}
                    />
                </div>

                <div className="mt-4 flex flex-col">
                    <label className={`${!merk ? 'text-red-600' : ''}`} htmlFor="merk">Merk</label>
                    <input
                        type="text"
                        id="merk"
                        value={merk}
                        onChange={(e) => setMerk(e.target.value)}
                        className={`p-1 border-2 ${!merk ? 'border-red-700' : ''} outline-none`}
                    />
                </div>

                <div className="mt-4 flex flex-col">
                    <label className={`${!deskripsi ? 'text-red-600' : ''}`} htmlFor="deskripsi">Deskripsi</label>
                    <textarea
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className={`p-1 border-2 ${!deskripsi ? 'border-red-700' : ''} outline-none`}
                    />
                </div>

                <div className="flex gap-x-3 mt-6">
                    <button
                        onClick={handleUpdate}
                        className={`w-2/4 py-1 text-center ${nama !== data.nama || stock !== data.stock || merk !== data.merk || deskripsi !== data.deskripsi || image !== null ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-500/40'} rounded-lg`}>
                        Ubah
                    </button>
                    <button
                        onClick={() => {
                            setDisplay(false)
                            setStock(data.stock)
                            setNama(data.nama)
                            setDeskripsi(data.deskripsi)
                            setMerk(data.merk)
                            setImage(null)
                        }}
                        className="w-2/4 py-1 text-center bg-red-500 hover:bg-red-600 rounded-lg"
                        type="button">
                        Batal
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModalBarang
