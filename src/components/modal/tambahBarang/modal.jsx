'use client'
import { Arvo } from "next/font/google"
import { useState } from "react"
import { FaImage } from "react-icons/fa"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const TambahModalBarang = ({ display, setDisplay, dataKategori }) => {
    const [image, setImage] = useState(null)
    const [nama, setNama] = useState('')
    const [stock, setStock] = useState(0)
    const [deskripsi, setDeskripsi] = useState('')
    const [merk, setMerk] = useState('')
    const [kategori, setKategori] = useState(0)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        setLoading(true)
        const formData = new FormData()
        const namaData = formData.append("nama", nama)
        const stockData = formData.append("stock", stock)
        const merkData = formData.append("merk", merk)
        const imageData = formData.append("image", image)
        const deskripsiData = formData.append("deskripsi", deskripsi)
        const kategoriData = formData.append("kategori", kategori)

        try {
            const response = await fetch(`/api/barang`, {
                method: 'POST',
                body: formData
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <span className={`loading loading-infinity loading-lg ${loading ? 'block' : 'hidden'}`}></span>
            <div className={`w-96 h-auto p-3 ${display && !loading ? 'flex flex-col' : 'hidden'} bg-base-100 rounded-lg modalPinjamBrg`}>
                <div className="flex flex-col gap-y-3">
                    <h1 className={`${arvo.className} mt-3 text-3xl opacity-90 line-clamp-1`}>Tambah Barang</h1>
                    <div className="flex items-center justify-between gap-x-2" >
                        <label className="w-24 h-24 flex flex-col items-center cursor-pointer" htmlFor="image">
                            <FaImage className="text-7xl" />
                            <span>Pilih Gambar</span>
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} className="hidden" type="file" id="image" accept=".png, .jpg, .jpeg" />
                    </div>
                    <div>
                        <span>Stock</span>
                        <div className="w-auto flex">
                            <button onClick={() => {
                                setStock(stock <= 0 ? 0 : stock - 1)
                            }} className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-r-0">-</button>
                            <div className="w-14 h-6 flex items-center justify-center text-xs border-2 border-base-300">{stock}</div>
                            <button onClick={() => {
                                setStock(stock + 1)
                            }} className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-l-0">+</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nama">nama</label>
                        <input onChange={(e) => setNama(e.target.value)} value={nama} className={`p-1 border-2 outline-none`} type="text" id="nama" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="merk">merk</label>
                        <input onChange={(e) => setMerk(e.target.value)} value={merk} className={`p-1 border-2 outline-none`} type="text" id="merk" />
                    </div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Pilih kategori barang</span>
                        </div>
                        <select defaultValue={""} onChange={(e) => setKategori(e.target.value)} className="select select-bordered">
                            <option disabled value={""}>Kategori</option>
                            {dataKategori.data.map((data, index) => {
                                return (
                                    <option key={index} value={data.id} >{data.nama}</option>
                                )
                            })}
                        </select>
                    </label>
                    <div className="flex flex-col">
                        <label htmlFor="deskripsi">deskripsi</label>
                        <textarea onChange={(e) => setDeskripsi(e.target.value)} value={deskripsi} className={`p-1 border-2 outline-none`} type="text" id="deskripsi"></textarea>
                    </div>
                    <div className="flex gap-x-3" >
                        <button onClick={() => {
                            if (nama !== '' && merk !== '' && deskripsi !== '' && stock !== 0 && kategori !== 0 && image !== null ) {
                                handle()
                            }
                        }} className={`w-2/4 py-1 text-center font-medium ${nama !== '' && merk !== '' && deskripsi !== '' && stock !== 0 && kategori !== 0 && image !== null ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-300'}  rounded-lg`} >Tambah</button>
                        <button onClick={() => {
                            setDisplay(false)
                        }} className="w-2/4 py-1 text-center bg-red-500 hover:bg-red-600 rounded-lg font-medium" type="button" >Batal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TambahModalBarang