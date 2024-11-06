"use client"
import { useEffect, useState } from "react"
import Search from "../search"
import { FaList } from "react-icons/fa"
import SideBar from "./sideBar"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Arvo } from "next/font/google"
import { BiSearchAlt2 } from "react-icons/bi"
import { BiSolidCategoryAlt } from "react-icons/bi";
import Link from "next/link"
import { signOut } from "next-auth/react"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const Head = ({ photoUser }) => {
    const [displaySide, setDisplaySide] = useState(false)
    const pathname = usePathname()
    const adminReq = pathname.includes("/admin")
    const urlBarang = pathname.includes("/admin/barang")
    const pinjam = pathname.includes("/admin/peminjaman")
    const konfirmasi = pathname.includes("/admin/konfirmasi")
    const [kategori, setKategori] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/kategori", {
                method: 'GET',
                cache: 'no-store'
            })
            const data = await response.json()

            setKategori(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="navbar w-full px-2 py-1 lg:px-5 lg:py-[0.36rem] flex items-center justify-between sticky top-0 lg:top-0 z-30 bg-base-100 lg:bg-transparent backdrop-blur-lg border-b-2 border-base-100">
            <div className="flex items-center lg:hidden gap-x-3">
                <FaList onClick={() => setDisplaySide(true)} className="text-xl opacity-80" />
                <Image src={"/images/parka.png"} alt="logo" width={80} height={1} />
            </div>
            <div className={`w-3/5 hidden md:block`}>
                <Search url={!adminReq ? "search" : urlBarang ? "admin/barang" : pinjam ? "admin/peminjaman" : konfirmasi ? "admin/konfirmasi" : false} />
            </div>
            <div className="flex items-center gap-x-3">
                {adminReq
                    ? null
                    : <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" fdprocessedid="">
                            <BiSolidCategoryAlt className="text-xl opacity-70" />
                        </div>
                        {loading
                            ? null
                            : <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {kategori.data.map((data, index) => {
                                    return (
                                        <Link key={index} href={`/kategori/${data.id}`}>
                                            <li>
                                                <button>{data.nama}</button>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>}
                    </div>}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" fdprocessedid="">
                        <div className="w-10 rounded-full">
                            <Image className="w-10 h-10 object-cover rounded-full bg-purple-500" src={photoUser} alt="image user" width={100} height={100} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {adminReq
                            ? null
                            :
                            <li>
                                <button onClick={() => router.push("/profil")}>
                                    Profil
                                </button>
                            </li>
                        }
                        <li><button onClick={() => signOut()}>Logout</button></li>
                    </ul>
                </div>
            </div>
            <div className={`h-[200vh] flex lg:hidden fixed top-0 left-0 z-40 ${displaySide ? 'w-full translate-x-0' : 'w-0 -translate-x-[208px]'} transition duration-500`}>
                <button onClick={() => setDisplaySide(false)} className={`${displaySide ? 'w-full' : 'w-0'} h-full cursor-default`}></button>
                <SideBar />
            </div>
        </div>
    )
}

export default Head