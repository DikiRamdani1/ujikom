'use client'

import { useState } from "react"
import ModalHapus from "./modal"
import { FaTrashCan } from "react-icons/fa6"

const ButtonHapus = ({id, title, url, currentBy}) => {
    const [displaModal, setDisplayModal] = useState(false)
    return (
        <>
        {!title
        ?  <button onClick={() => setDisplayModal(true)}><FaTrashCan className="text-xl text-red-500 hover:text-red-600" /></button>
        : <button onClick={() => setDisplayModal(true)} className="w-32 py-1 bg-red-500 hover:bg-red-600 rounded-lg font-medium text-black opacity-90 text-lg transition">{title}</button>
}
            <ModalHapus url={url} id={id} by={currentBy} display={displaModal} setDisplay={setDisplayModal} />
        </>
    )
}

export default ButtonHapus