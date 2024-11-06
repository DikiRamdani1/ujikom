"use client"

import { useState } from "react"
import { IoStarSharp } from "react-icons/io5"

const ButtonFavorite = ({ favorite, user, barang }) => {
    const [favoriteStatus, setFavoriteStatus] = useState(favorite.status == 200 ? true : false)

    const handleFavorite = async () => {

        if (!favoriteStatus) {
            setFavoriteStatus(true)
            try {
                const response = await fetch(`/api/barang/favorite?userId=${user.data[0].id}&barangId=${barang}`, {
                    method: "POST"
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setFavoriteStatus(false)
            try {
                const response = await fetch(`/api/barang/favorite?userId=${user.data[0].id}&barangId=${barang}`, {
                    method: "DELETE"
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <button onClick={() => handleFavorite()} className={`w-32 flex items-center justify-center gap-x-1 rounded-lg border-2 border-purple-500 ${favoriteStatus ? 'bg-purple-500 text-black' : 'bg-transparent'} transition`}>
            <IoStarSharp className="text-yellow-400 text-lg" />
            <span className="font-medium opacity-90 text-lg">Favorite</span>
        </button>
    )
}

export default ButtonFavorite