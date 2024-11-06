'use client'

import { useState } from "react"
import UpdateModal from "./modal"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

const ButtonUpdate = ({title, dataPinjam, setStatus}) => {
    const [displayModal, setDisplayModal] = useState(false)
    return (
        <>
            <button onClick={() => setDisplayModal(true)} ><IoMdCheckmarkCircleOutline className="text-xl text-green-500 hover:text-green-600" /></button>
            <UpdateModal display={displayModal} setDisplay={setDisplayModal} data={dataPinjam} status={setStatus} />
        </>
    )   
}

export default ButtonUpdate