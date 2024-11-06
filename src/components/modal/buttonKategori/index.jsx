'use client'

import { useState } from "react"

const ButtonKategori = () => {
    const [nama, setNama] = useState('')

    const handlePostKategori = async () => {
        const formData = new FormData()
        formData.append("nama", nama)
        try {
            const response = await fetch("/api/kategori", {
                method: 'POST',
                body: formData

            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="flex gap-x-3" onSubmit={handlePostKategori} >
            <input onChange={(e) => setNama(e.target.value)} value={nama} className="pl-2 border-2 border-black border-opacity-50 rounded-lg" type="text" placeholder="Kategori" required />
            <button className="px-4 py-1 bg-purple-500 hover:bg-purple-600 font-medium text-opacity-90 rounded-lg" type="submit">Tambah Kategori</button>
        </form>
    )
}

export default ButtonKategori