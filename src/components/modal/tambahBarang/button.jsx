'use client'

import { useState } from "react"
import TambahModalBarang from "./modal"
import { FaPlus } from "react-icons/fa6"

const ButtonTambahBarang = ({apiKategori}) => {
    const [displayModal, setDisplayModal] = useState(false)
    return (
        <>
            <button onClick={() => setDisplayModal(true)} className="w-32 py-1 flex items-center justify-center gap-x-1 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-black opacity-90 text-lg transition" ><FaPlus/><span>Tambah</span></button>
            <TambahModalBarang display={displayModal} setDisplay={setDisplayModal} dataKategori={apiKategori} />
        </>
    )   
}

export default ButtonTambahBarang