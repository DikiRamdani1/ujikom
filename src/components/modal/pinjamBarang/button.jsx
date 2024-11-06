'use client'

import { useState } from "react"
import PinjamBarang from "./pinjamBarang"

const ButtonPinjam = ({barang, user}) => {
    const [displaModal, setDisplayModal] = useState(false)
    return (
        <>
            <button onClick={() => setDisplayModal(true)} className="w-32 border-2 border-purple-500 bg-purple-500 hover:bg-purple-700 hover:border-purple-700 rounded-lg font-medium text-black opacity-90 text-lg transition" fdprocessedid="">Pinjam</button>
            <PinjamBarang barang={barang} user={user} display={displaModal} setDisplay={setDisplayModal} />
        </>
    )
}

export default ButtonPinjam