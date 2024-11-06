'use client'

import { useState } from "react"
import ModalUbahProfil from "./modal"


const ButtonUbahProfil = ({api}) => {
    const [displayModal, setDisplayModal] = useState(false)
    return (
        <>
            <button onClick={() => setDisplayModal(true)} className="w-32 py-1 mt-3 bg-purple-500 hover:bg-purple-600 font-medium text-black opacity-90 rounded-lg relative" >Ubah Profil</button>
            <ModalUbahProfil display={displayModal} setDisplay={setDisplayModal} user={api} />
        </>
    )
}

export default ButtonUbahProfil