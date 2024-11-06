"use client"
import { Cagliostro, Galindo } from "next/font/google"
import { MdHome, MdInfo } from "react-icons/md"
import { FaHotjar, FaUserCircle } from "react-icons/fa"
import { HiClipboardList } from "react-icons/hi"
import { PiPaintBrushHouseholdFill } from "react-icons/pi"
import { BiSolidDoorOpen } from "react-icons/bi"
import { IoMdClock } from "react-icons/io"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { MdSunny } from "react-icons/md"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { BsBoxFill } from "react-icons/bs"
import { IoIosCheckmarkCircle } from "react-icons/io"

const galindo = Galindo({ subsets: ['latin'], weight: "400" })
const cagilostro = Cagliostro({ subsets: ['latin'], weight: '400' })

const SideBar = () => {
    const [acordingTema, setAcordingTema] = useState(false)
    const [darkMode, setDarkMode] = useState(null)
    const pathname = usePathname()
    const adminReq = pathname.includes("/admin")

    useEffect(() => {
        const mode = localStorage.getItem("darkMode")
        setDarkMode(mode)
        if (mode == "dark") {
            document.body.setAttribute("data-theme", "dark")
        } else {
            document.body.setAttribute("data-theme", "light")
        }
    }, [])

    return (
        <nav className={`w-52 h-full lg:w-64 lg:h-screen bg-base-100 absolute lg:sticky left-0 top-0 shadow-2xl`}>
            <div className="flex flex-col pl-7 pr-3">
                <Image className="mt-1" src={"/images/parka.png"} alt="logo" width={125} height={25} />
                <div className="flex flex-col mt-5 sm:mt-10">
                    <h1 className="text-opacity-90 font-medium">Menu</h1>
                    {adminReq
                        ? <>
                            <a href="/admin" className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname == "/admin" ? "bg-purple-500" : null}`}>
                                    <MdHome className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Beranda</h6>
                                </div>
                            </a>
                            <a href="/admin/barang/1" className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname.includes("/admin/barang") ? "bg-purple-500" : null}`}>
                                    <BsBoxFill className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>barang</h6>
                                </div>
                            </a>
                            <a href="/admin/peminjaman/1" className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname.includes("/admin/peminjaman") ? "bg-purple-500" : null}`}>
                                    <HiClipboardList className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Peminjaman</h6>
                                </div>
                            </a>
                            <a href="/admin/konfirmasi/1" className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname.includes("/admin/konfirmasi") ? "bg-purple-500" : null}`}>
                                    <IoIosCheckmarkCircle className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Konfirmasi</h6>
                                </div>
                            </a>
                        </>
                        : <>
                            <Link href={"/"} className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname == "/" ? "bg-purple-500" : null}`}>
                                    <MdHome className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Beranda</h6>
                                </div>
                            </Link>
                            <Link href={"/terbaru/1"} className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname.includes("/terbaru") ? "bg-purple-500" : null}`}>
                                    <IoMdClock className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Terbaru</h6>
                                </div>
                            </Link>
                            <a href="/peminjaman" className="mt-2">
                                <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname == "/peminjaman" ? "bg-purple-500" : null}`}>
                                    <HiClipboardList className="text-xl opacity-70" />
                                    <h6 className={`opacity-90`}>Peminjaman</h6>
                                </div>
                            </a>
                        </>}
                </div>
                <div className="flex flex-col mt-5">
                    <h1 className="text-opacity-90 font-medium">Opsi Lainnya</h1>
                    {!adminReq
                        ? <Link href={"/profil"} className="mt-2">
                            <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname == "/profil" ? "bg-purple-500" : null}`}>
                                <FaUserCircle className="text-xl opacity-70" />
                                <h6 className={`opacity-90`}>Profil</h6>
                            </div>
                        </Link>
                        : null}
                    <Link href={adminReq ? '/admin/tentang' : '/tentang'} className="mt-2">
                        <div className={`py-1 pl-1 flex gap-x-1 hover:bg-purple-500 ${pathname == "/tentang" || pathname == "/admin/tentang" ? "bg-purple-500" : null}`}>
                            <MdInfo className="text-xl opacity-70" />
                            <h6 className={`opacity-90`}>Tentang</h6>
                        </div>
                    </Link>
                    <div onClick={() => {
                        if (acordingTema) {
                            setAcordingTema(false)
                        } else {
                            setAcordingTema(true)
                        }
                    }} className="py-1 pl-1 mt-2 flex gap-x-1 hover:bg-purple-500 cursor-pointer">
                        <PiPaintBrushHouseholdFill className="text-xl opacity-70" />
                        <button className={`opacity-90`} fdprocessedid="">Tema</button>
                    </div>
                    <div className={`${acordingTema ? 'w-auto' : 'w-0 absolute overflow-hidden'} transition duration-500`}>
                        <div onClick={() => {
                            document.body.setAttribute("data-theme", "light")
                            localStorage.setItem("darkMode", "light")
                            setDarkMode("light")
                        }} className={`py-1 pl-1 ml-9 mt-2 flex gap-x-1 hover:bg-purple-500 ${darkMode !== "dark" ? "bg-purple-500" : null} opacity-90 cursor-pointer`}>
                            <MdSunny className="text-xl opacity-70" />
                            <button fdprocessedid="">Cerah</button>
                        </div>
                        <div onClick={() => {
                            document.body.setAttribute("data-theme", "dark")
                            localStorage.setItem("darkMode", "dark")
                            setDarkMode("dark")
                        }} className={`py-1 pl-1 ml-9 mt-2 flex gap-x-1 hover:bg-purple-500 ${darkMode == "dark" ? "bg-purple-500" : null} opacity-90 cursor-pointer`}>
                            <BsFillMoonStarsFill className="text-lg opacity-70" />
                            <button fdprocessedid="">Gelap</button>
                        </div>
                    </div>
                    <div onClick={() => signOut()
                    } className="py-1 pl-1 mt-2 flex gap-x-1 hover:bg-purple-500 cursor-pointer">
                        <BiSolidDoorOpen className="text-xl opacity-70" />
                        <h6 className={`opacity-90`}>Keluar</h6>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default SideBar