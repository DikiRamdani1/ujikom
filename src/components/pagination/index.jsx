'use client'

import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Pagination = ({ page, lastPage, url, display, search }) => {
    const [count, setCount] = useState(page)
    const router = useRouter()

    const handleNext = () => {
        if (page !== lastPage) {
            setCount(page + 1)
        }
    }

    const handlePrev = () => {
        if (page >= 2) {
            setCount(page - 1)
        }
    }

    useEffect(() => {
        router.push(`${url}${count}${search}`)
    }, [count])

    return (
        <div className={`${display ? 'flex justify-between' : 'flex flex-col items-center'} mt-5`} >
            <div className="w-auto flex flex-wrap md:flex-nowrap gap-x-3">
                <button onClick={handlePrev} className="p-2 bg-base-100 rounded-lg"><MdOutlineKeyboardDoubleArrowLeft /></button>
                <div className="flex bg-base-100 rounded-lg font-semibold">
                    <button onClick={() => lastPage <= 5 ? setCount(1) : page > 5 ? lastPage - 5 < page ? setCount(lastPage - 4) : setCount(page - 2) : setCount(1)} className={`w-11 h-11 ${lastPage <= 5 ? page == 1 ? 'bg-purple-500' : 'bg-base-100' : page == 1 ? 'bg-purple-500' : 'bg-base-100'} rounded-lg`}>{lastPage <= 5 ? 1 : lastPage - 5 < page && page > 5 ? lastPage - 4 : page > 5 ? page - 2 : 1}</button>
                    <button className={`w-11 h-11 ${lastPage <= 1 ? 'hidden' : 'block'} ${lastPage <= 5 ? page == 2 ? 'bg-purple-500' : 'bg-base-100' : page == 2 ? 'bg-purple-500' : 'bg-base-100'} rounded-lg`}>{lastPage <= 5 ? 2 : lastPage - 5 < page && page > 5 ? lastPage - 3 : page > 5 ? page - 1 : 2}</button>
                    <button className={`w-11 h-11 ${lastPage <= 2 ? 'hidden' : 'block'} ${lastPage <= 5 ? page == 3 ? 'bg-purple-500' : 'bg-base-100' : page < 5 ? page == 3 ? 'bg-purple-500' : 'bg-base-100' : lastPage - 1 > page && page > 5 ? 'bg-purple-600' : 'bg-base-100'} rounded-lg`}>{lastPage <= 5 ? 3 : lastPage - 5 < page && page > 5 ? lastPage - 2 : page > 5 ? page : 3}</button>
                    <button className={`w-11 h-11 ${lastPage <= 3 ? 'hidden' : 'block'} ${lastPage <= 5 ? page == 4 ? 'bg-purple-500' : 'bg-base-100' : page == 4 ? 'bg-purple-500' : lastPage - 1 == page && page > 5 ? 'bg-purple-500' : 'bg-base-100'} rounded-lg`}>{lastPage <= 5 ? 4 : lastPage - 5 < page && page > 5 ? lastPage - 1 : page > 5 ? page + 1 : 4}</button>
                    <button className={`w-11 h-11 ${lastPage <= 4 ? 'hidden' : 'block'} ${lastPage <= 5 ? page == 5 ? 'bg-purple-500' : 'bg-base-100' : lastPage == page || page == 5 ? 'bg-purple-500' : 'bg-base-100'} rounded-lg`}>{lastPage <= 5 ? 5 : lastPage - 5 < page && page > 5 ? lastPage : page > 5 ? page + 2 : 5}</button>
                </div>
                <button onClick={handleNext} className="p-2 bg-base-100 rounded-lg"><MdOutlineKeyboardDoubleArrowRight /></button>
            </div>
            <div className="mt-3">
                <button onClick={() => router.push(`${url}${lastPage}`)} className="text-center opacity-70 underline">{lastPage} halaman</button>
            </div>
        </div>

    )
}

export default Pagination