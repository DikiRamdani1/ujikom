'use client'

import { useState } from "react"
import UpdateModalBarang from "./modal"
import { FaPencilAlt } from "react-icons/fa"

const ButtonUpdateBarang = ({title, dataBarang}) => {
    const [displayModal, setDisplayModal] = useState(false)
    return (
        <>
            <button onClick={() => setDisplayModal(true)} ><FaPencilAlt className="text-xl text-yellow-500"/></button>
            <UpdateModalBarang display={displayModal} setDisplay={setDisplayModal} data={dataBarang} />
        </>
    )   
}

export default ButtonUpdateBarang