'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { MdSend } from "react-icons/md"
import { VscKebabVertical } from "react-icons/vsc";

const cookieJs = require("js-cookie")
const Ulasan = ({ api, ulasanUser, user, barangId }) => {
    const [inputUlasan, setInputUlasan] = useState("")
    const [ulasan, setUlasan] = useState({})
    const [rating, setRating] = useState(5)
    const [displayInputUlasan, setDisplayInputUlasan] = useState(ulasanUser.status == 200 ? false : true)
    const [dropDown, setDropDown] = useState(false)
    const dataUlasan = api.status == 200 ? api.data.filter(ulasan => ulasan.id_user !== user.data[0].id) : null
    const date = new Date(ulasanUser.status == 200 ? ulasanUser.data[0].createdAt : null)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const handlePostUlasan = async () => {
        try {
            const response = await fetch("/api/ulasan", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.data[0].id,
                    barangId: barangId,
                    rating: rating,
                    content: inputUlasan
                })
            })
        } catch (error) {
            console.log(error)

        }
    }

    const handlePutUlasan = async () => {
        try {
            const response = await fetch(`/api/ulasan?barangId=${barangId}&userId=${user.data[0].id}`)
            const dataUlasanUser = await response.json()
            await fetch("/api/ulasan", {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: dataUlasanUser.data[0].id,
                    barangId: barangId,
                    rating: rating,
                    content: inputUlasan
                })
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUlasan = async () => {
        try {
            const response = await fetch(`/api/ulasan?barangId=${barangId}&userId=${user.data[0].id}`)
            const dataUlasanUser = await response.json()
            await fetch(`/api/ulasan?id=${dataUlasanUser.data[0].id}`,
                {
                    method: 'DELETE'
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const btnDelete = () => {
        handleDeleteUlasan()
    }

    const handleUlasan = (e) => {
        if (inputUlasan !== "") {
            if (e.key == "Enter" || e.type == "click") {
                if (ulasanUser.status == 200 || ulasan.status) {
                    handlePutUlasan()
                } else {
                    handlePostUlasan()
                }

                setUlasan({
                    status: true,
                    data: {
                        nama: user.data[0].nama,
                        image: user.data[0].image,
                        rating: rating,
                        content: inputUlasan
                    }
                })
                setDisplayInputUlasan(false)
            }
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold opacity-90">Berikan rating barang ini</h1>
            {ulasan.status || !displayInputUlasan
                ? <div className={`w-full mt-5 ${ulasan.status || !displayInputUlasan ? 'flex' : 'hidden'} gap-x-3 animeOpacity`}>
                    <Image className="w-9 h-9 bg-purple-500 object-cover rounded-full" src={ulasan.status ? ulasan.data.image : ulasanUser.data[0].image} alt={`gambar user`} width={20} height={20} />
                    <div className="w-full">
                        <h1 className="font-semibold opacity-90 text-lg">{ulasan.status ? ulasan.data.nama : ulasanUser.data[0].nama}</h1>
                        <div className="md:pr-8 mt-2 flex items-end justify-between gap-x-5">
                            <div className="flex items-end gap-x-5">
                                <div className="flex gap-x-2">
                                    <div className={`mask mask-star bg-yellow-400 w-5 h-5`}></div>
                                    <div className={`mask mask-star w-5 h-5 ${ulasan.status ? ulasan.data.rating >= 6 ? "bg-yellow-400" : "bg-yellow-400/30" : ulasanUser.data[0].rating >= 6 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                    <div className={`mask mask-star w-5 h-5 ${ulasan.status ? ulasan.data.rating >= 7 ? "bg-yellow-400" : "bg-yellow-400/30" : ulasanUser.data[0].rating >= 7 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                    <div className={`mask mask-star w-5 h-5 ${ulasan.status ? ulasan.data.rating >= 8 ? "bg-yellow-400" : "bg-yellow-400/30" : ulasanUser.data[0].rating >= 8 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                    <div className={`mask mask-star w-5 h-5 ${ulasan.status ? ulasan.data.rating >= 9 ? "bg-yellow-400" : "bg-yellow-400/30" : ulasanUser.data[0].rating >= 9 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                </div>
                                <h6>{ulasanUser.status == 200 ? ulasan.status ? "baru saja" : `${day}/${month}/${year}` : "baru saja"}</h6>
                            </div>
                            <div className="relative">
                                <VscKebabVertical onClick={() => {
                                    if (dropDown) {
                                        setDropDown(false)
                                    } else {
                                        setDropDown(true)
                                    }
                                }} className="text-xl cursor-pointer" />
                                <div className={`py-3 ${!dropDown ? "hidden" : "block"} absolute top-full right-[50%] bg-base-100 rounded-lg`}>
                                    <button onClick={() => {
                                        setDropDown(false)
                                        setInputUlasan('')
                                        setDisplayInputUlasan(true)
                                    }} className="w-full px-3 py-1 hover:bg-base-200 text-start">edit</button>
                                    <button onClick={() => {
                                        setUlasan({
                                            status: false,
                                            data: {
                                                nama: user.data[0].nama,
                                                image: user.data[0].image,
                                                rating: rating,
                                                content: inputUlasan
                                            }
                                        })
                                        btnDelete()
                                        setInputUlasan('')
                                        setDropDown(false)
                                        setDisplayInputUlasan(true)
                                    }} className="w-full px-3 py-1 hover:bg-base-200">delete</button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-1">{ulasan.status ? ulasan.data.content : ulasanUser.data[0].content}</p>
                    </div>
                </div>
                : null}
            <div className={`${ulasanUser.status !== 200 ? displayInputUlasan ? "block" : "hidden" : displayInputUlasan ? "block" : "hidden"} animeOpacity`}>
                <div className="rating gap-x-5 mt-4">
                    <input onClick={() => setRating(5)} type="radio" name="rating-1" className="mask mask-star bg-yellow-400" defaultChecked />
                    <input onClick={() => setRating(6)} type="radio" name="rating-1" className="mask mask-star bg-yellow-400" />
                    <input onClick={() => setRating(7)} type="radio" name="rating-1" className="mask mask-star bg-yellow-400" />
                    <input onClick={() => setRating(8)} type="radio" name="rating-1" className="mask mask-star bg-yellow-400" />
                    <input onClick={() => setRating(9)} type="radio" name="rating-1" className="mask mask-star bg-yellow-400" />
                </div>
                <div className="w-full mt-2 flex gap-x-3">
                    <Image className="w-9 h-9 bg-purple-500 object-cover rounded-full" src={user.data[0].image} alt={"gambar user"} width={20} height={20} />
                    <div className="w-full flex items-center relative">
                        <input onKeyDown={handleUlasan} onChange={(e) => setInputUlasan(e.target.value)} value={inputUlasan} className="w-full py-2 pl-2 bg-transparent border-b-2 border-base-100 outline-none" type="text" placeholder="tulis pendapat anda" />
                        <MdSend onClick={handleUlasan} className="text-xl absolute right-2 cursor-pointer" />
                    </div>
                </div>
            </div>
            <h1 className="text-xl font-semibold opacity-90 mt-8">Ulasan Lainnya</h1>
            {api.status !== 200
                ? null
                : dataUlasan.map((data, index) => {
                    const date = new Date(data.createdAt)
                    const year = date.getFullYear()
                    const month = date.getMonth() + 1
                    const day = date.getDate()

                    return (
                        <div key={index} className="w-full mt-5 flex gap-x-3">
                            <Image className="w-9 h-9 bg-purple-500 object-cover rounded-full" src={data.image} alt={`gambar ${data.nama}`} width={20} height={20} />
                            <div className="w-full">
                                <h1 className="font-semibold opacity-90 text-lg">{data.nama}</h1>
                                <div className="mt-2 flex items-end gap-x-5">
                                    <div className="flex gap-x-2">
                                        <div className={`mask mask-star bg-yellow-400 w-5 h-5`}></div>
                                        <div className={`mask mask-star w-5 h-5 ${data.rating >= 6 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                        <div className={`mask mask-star w-5 h-5 ${data.rating >= 7 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                        <div className={`mask mask-star w-5 h-5 ${data.rating >= 8 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                        <div className={`mask mask-star w-5 h-5 ${data.rating >= 9 ? "bg-yellow-400" : "bg-yellow-400/30"}`}></div>
                                    </div>
                                    <h6>{day}/{month}/{year}</h6>
                                </div>
                                <p className="mt-1">{data.content}</p>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Ulasan