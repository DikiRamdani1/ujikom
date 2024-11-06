'use client'
import { useState } from "react"
import LittleList from "../listBarang/littleList"
import ListBarang from "../listBarang"

const ContentPeminjaman = ({ api1, api2, title1, title2, tabName }) => {
    const [display, setDisplay] = useState(false)

    return (
        <>
            <div className="w-auto mt-5 flex gap-x-3" >
                <button onClick={() => setDisplay(false)} className={`w-32 py-1 ${display ? 'bg-transparent' : 'bg-purple-500'} text-center border-2 border-purple-500 rounded-lg font-medium text-lg text-opacity-90`} >{title1}</button>
                <button onClick={() => setDisplay(true)} className={`w-32 py-1 ${display ? 'bg-purple-500' : 'bg-transparent'} text-center border-2 border-purple-500 rounded-lg font-medium text-lg text-opacity-90`} >{title2}</button>
            </div>
            {tabName == "landing"
                ? <>
                    {api1.status == 200
                        ? <section className={`${display ? 'hidden' : 'block animateOpacity'}`} >
                            <LittleList api={api1} apiName={"borrowed"} />
                        </section>
                        : null}
                    {api2.status == 200
                        ? <section className={`${display ? 'block animateOpacity' : 'hidden'}`} >
                            <LittleList api={api2} apiName={"pending"} />
                        </section>
                        : null}
                </>
                : <>
                    {api1.status== 200
                        ? <section className={`${display ? 'hidden' : 'block animateOpacity'} mt-5`} >
                            <ListBarang api={api1} title={"Pinjaman Selesai"} link={false} />
                        </section>
                        : null}
                    {api2.status== 200
                        ? <section className={`${display ? 'block animateOpacity' : 'hidden'} mt-5`} >
                            <ListBarang api={api2} title={"favorite"} link={false} />
                            </section>
                        : null}
                </>
            }


        </>
    )
}

export default ContentPeminjaman