'use client'
import { useState } from "react"
import ModalPerpanjang from "./modal"

const ButtonPerpanjang = () => {
    const [displayModal, setDisplayModal] = useState(false)

    return (
        <>
            <button onClick={() => setDisplayModal(true)} className="w-32 py-1 text-center border-2 border-purple-500 bg-purple-500 rounded-lg font-medium text-opacity-90 hover:bg-transparent transition" >Perpanjang</button>
            <ModalPerpanjang display={displayModal} setDisplay={setDisplayModal} />
        </>
    )
}

export default ButtonPerpanjang