import { Arvo } from "next/font/google"

const arvo = Arvo({ subsets: ["latin"], weight: "400" })

const ModalPerpanjang = ({display, setDisplay}) => {
    return (
        <div className={`w-full h-screen ${display ? 'flex' : 'hidden'} justify-center items-center bg-black/70 fixed top-0 left-0 z-40`} >
            <div className={`w-72 h-auto p-5 ${display ? 'flex' : 'hidden'} flex-col items-center bg-base-100 rounded-lg modalPinjamBrg`}>
                <h1 className={`${arvo.className} text-lg opacity-90 text-center`}>Konfirmasi sama pak handi yaa!</h1>
                <button onClick={() => setDisplay(false)} className="w-32 py-1 mt-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-center" >Siap</button>
            </div>
        </div>
    )
}

export default ModalPerpanjang