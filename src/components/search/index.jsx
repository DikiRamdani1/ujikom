'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiSearchAlt2 } from "react-icons/bi"

const Search = ({url}) => {
    const [inputSearch, setInputSearch] = useState('')
    const router = useRouter()

    const handleSearch = (e) => {
        const keyword = inputSearch
            if (url !== false) {
                if (e.key == "Enter" || e.type == "click") {
                    if (!keyword == "") {
                        e.preventDefault()
                        router.push(`/${url}/1/${keyword}`)
                    }
                }
            }
    }

    return (
        <div className="w-full flex items-center relative">
            <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} onKeyDown={handleSearch} className={`w-full pl-3 pr-10 py-1 bg-white border-none outline-none`} type="text" placeholder="pencarian..." fdprocessedid="" />
            <BiSearchAlt2 onClick={handleSearch} className="text-2xl text-black opacity-50 absolute right-2 cursor-pointer" />
        </div>
    )
}

export default Search