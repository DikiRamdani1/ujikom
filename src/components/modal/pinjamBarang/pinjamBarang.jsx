'use client'

import Image from "next/image"
import { useEffect, useState } from "react"


const PinjamBarang = ({ barang, user, display, setDisplay }) => {
    const [count, setCount] = useState(barang.data[0].stock == 0 ? 0 : 1)
    const [tglKembali, setTglKembali] = useState('')
    const [statusPinjam, setStatusPinjam] = useState(false)
    const [userPinjam, setUserPinjam] = useState(false)
    const [pinjamLagi, setPinjamLagi] = useState('')
    const [term, setTerm] = useState('')
    const [checked, setChecked] = useState(false)
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const maxDate = new Date(date);
    maxDate.setDate(date.getDate() + 7);
    const maxDay = maxDate.getDate();
    const maxMonth = maxDate.getMonth() + 1;
    const maxYear = maxDate.getFullYear();

    const handlePostPinjamBrg = async () => {
        if (count !== 0) {

            setStatusPinjam('loading')
            try {
                const response = await fetch("/api/peminjaman", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user.data[0].id,
                        barangId: barang.data[0].id,
                        stock: count,
                        tglKembali: tglKembali
                    })
                })

                const data = await response.json()

                if (data.status == 200) {
                    setStatusPinjam('sukses')
                } else if (data.status == 400) {
                    setStatusPinjam('gagal')
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handlePinjam = () => {
        if (tglKembali !== "") {
            handlePostPinjamBrg()
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            setStatusPinjam('loading')
            try {
                const response = await fetch(`/api/peminjaman?userId=${user.data[0].id}&barangId=${barang.data[0].id}`, {
                    method: 'GET',
                    cache: 'no-store'
                })
                const data = await response.json()
                if (data.status == 200) {
                    setUserPinjam(true)
                    setTerm(false)
                    setPinjamLagi(true)
                } else {
                    setTerm(true)
                }
                setStatusPinjam(false)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <div className={`w-full h-screen px-5 md:px-0 ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`}>
            <div className={`w-full md:w-[600px] h-auto md:h-64 p-3 ${statusPinjam == 'detail' ? 'flex md:flex-row' : 'hidden'} gap-x-3 bg-base-100 rounded-lg modalPinjamBrg`}>
                <div className="w-[30%] h-full bg-purple-500">
                    <Image className="w-full h-full object-cover" src={barang.data[0].image} alt="gambar item" width={200} height={300} />
                </div>
                <div className="w-[70%]">
                    <h1 className={`md:mt-3 text-xl md:text-3xl opacity-90 line-clamp-1`}>{barang.data[0].nama}</h1>
                    <h6 className="text-lg">stock {barang.data[0].stock}</h6>
                    <div className="w-auto mt-2 md:mt-4 flex">
                        <button onClick={() => {
                            setCount(count <= 0 ? 0 : count - 1)
                        }} className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-r-0">-</button>
                        <div className="w-14 h-6 flex items-center justify-center text-xs border-2 border-base-300">{count}</div>
                        <button onClick={() => {
                            setCount(count >= barang.data[0].stock ? barang.data[0].stock : count + 1)
                        }} className="w-7 h-6 flex items-center justify-center border-2 border-base-300 border-l-0">+</button>
                    </div>
                    <div className="w-auto mt-2 md:mt-4 flex items-end md:items-start gap-x-3">
                        <label className="text-sm md:text-lg" htmlFor="tglKembali">
                            tanggal kembali
                        </label>
                        <input onChange={(e) => setTglKembali(e.target.value)} value={tglKembali} className={`px-1 md:px-3 py-1 bg-base-300 cursor-pointer ${tglKembali !== '' ? null : 'text-red-500'}`} type="datetime-local" name="" id="tglKembali" min={`${year}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}T00:00`} max={`${maxYear}-${maxMonth <= 9 ? `0${maxMonth}` : maxMonth}-${maxDay <= 9 ? `0${maxDay}` : maxDay}T00:00`} />
                    </div>
                    <div className="w-auto mt-2 md:mt-4 flex gap-x-3">
                        <button onClick={handlePinjam} className="px-10 py-1 bg-purple-500 border-none rounded-lg text-black font-medium hover:bg-purple-600" >Pinjam</button>
                        <button onClick={() => {
                            setDisplay(false)
                            setStatusPinjam(false)
                            if (userPinjam) {
                                setPinjamLagi(true)
                            } else {
                                setTerm(true)
                            }
                        }} className="px-10 py-1 bg-red-500 border-none rounded-lg text-black font-medium hover:bg-red-600" >Batal</button>
                    </div>
                </div>
            </div>
            <span className={`loading loading-infinity loading-lg ${statusPinjam == 'loading' ? 'block' : 'hidden'}`}></span>
            <div className={`w-72 h-auto p-5 ${statusPinjam == 'sukses' ? 'flex flex-col items-center' : 'hidden'} bg-base-100 rounded-lg`} >
                <h1 className={`text-lg opacity-90 text-center`}>Sukses, tolong konfirmasi di ruang pak Handi</h1>
                <div className="mt-4 flex gap-x-2">
                    <button onClick={() => {
                        setDisplay(false)
                        setStatusPinjam(false)
                        if (userPinjam) {
                            setPinjamLagi(true)
                        } else {
                            setTerm(true)
                        }
                    }} className="px-8 py-1 text-center bg-purple-500 hover:bg-purple-600 text-black text-opacity-90 font-medium">Ya</button>
                </div>
            </div>
            <div className={`w-72 h-auto p-5 ${statusPinjam == 'gagal' ? 'flex flex-col items-center' : 'hidden'} bg-base-100 rounded-lg modalPinjamBrg`} >
                <h1 className={`text-lg opacity-90 text-center`}>Pinjaman barang anda sudah mencapai batas</h1>
                <div className="mt-4 flex gap-x-2">
                    <button onClick={() => {
                        setDisplay(false)
                        setStatusPinjam(false)
                        if (userPinjam) {
                            setPinjamLagi(true)
                        } else {
                            setTerm(true)
                        }
                    }} className="px-8 py-1 text-center bg-purple-500 hover:bg-purple-600 text-black text-opacity-90 font-medium">Ya</button>
                </div>
            </div>
            <div className={`w-72 h-auto p-5 ${pinjamLagi ? 'block' : 'hidden'} bg-base-100 rounded-lg modalPinjamBrg`} >
                <h1 className={`text-lg opacity-90 text-center`}>Apakah anda ingin pinjam barang ini lagi?</h1>
                <div className="mt-4 flex gap-x-2">
                    <button onClick={() => {
                        setPinjamLagi(false)
                        setStatusPinjam("detail")
                    }} className={`w-2/4 py-1 text-center bg-purple-500 hover:bg-purple-600 text-black`}>Ya</button>
                    <button onClick={() => setDisplay(false)} className="w-2/4 py-1 text-center bg-red-500 hover:bg-red-600 text-black text-opacity-90 font-medium">Kembali</button>
                </div>
            </div>
            <div className={`w-full sm:w-96 h-auto p-3 ${term ? 'flex' : 'hidden'} flex-col  bg-base-100 rounded-lg modalPinjamBrg`} >
                <h1 className={`text-lg opacity-90`}>Syarat dan Ketentuan Peminjaman Barang</h1>
                <ul className="pl-5 mt-2 list-disc">
                    <li className="mt-2" >Maksimal 10 barang yang dipinjam.</li>
                    <li className="mt-2">Maksimal durasi peminjaman 7 hari.</li>
                    <li className="mt-2">
                        Jika suatu barang rusak atau hilang saat dipinjam, siswa bertanggung jawab untuk memperbaiki atau mengganti barang tersebut.</li>
                    <li className="mt-2">
                        Barang harus dikembalikan tepat waktu sesuai aturan yang telah ditetapkan. jika terlambat akan dikenakan denda.</li>
                </ul>
                <label className="mt-2" htmlFor="">
                    <input onChange={(e) => setChecked(e.target.checked)} checked={checked} className="w-auto cursor-pointer" type="checkbox" name="" id="" />
                    <span className="ml-2 text-xs" >Saya telah membaca dan menyetujui Syarat dan Ketentuan peminjaman.</span>
                </label>
                <div className="mt-4 flex gap-x-2">
                    <button onClick={() => {
                        if (checked) {
                            setTerm(false)
                            setStatusPinjam("detail")
                        }
                    }} className={`w-2/4 py-1 text-center ${checked ? 'bg-opacity-100' : 'bg-opacity-40'} bg-purple-500 text-black`}>Lanjut</button>
                    <button onClick={() => setDisplay(false)} className="w-2/4 py-1 text-center bg-red-500 hover:bg-red-600 text-black text-opacity-90 font-medium">Kembali</button>
                </div>
            </div>
        </div>
    )
}

export default PinjamBarang