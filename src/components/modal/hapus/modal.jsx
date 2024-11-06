'use client'
import { Arvo } from "next/font/google"
import { useState } from "react"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const ModalHapus = ({ url, id, by, display, setDisplay }) => {
    const [loading, setLoading] = useState(false)
    const deleteData = async () => {
        setLoading(true)
        try {
            await fetch(`/api/${url}?${by}=${id}`, {
                method: 'DELETE'
            })

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <span className={`loading loading-infinity loading-lg ${loading ? 'block' : 'hidden'}`}></span>
            <div className={`w-72 h-auto p-5 bg-base-100 rounded-lg ${loading ? 'hidden' : 'block'} modalPinjamBrg`}>
                <h1 className={`text-lg opacity-90 text-center`}>Apakah Yakin?</h1>
                <div className="w-full mt-3 flex justify-between gap-x-2">
                    <button onClick={() => deleteData()} className="px-8 py-1 bg-purple-500 hover:bg-purple-600 rounded-lg" >Ya</button>
                    <button onClick={() => setDisplay(false)} className="px-8 py-1 bg-red-500 hover:bg-red-600 rounded-lg" >Tidak</button>
                </div>
            </div>
        </div>
    )
}

export default ModalHapus