'use client'
import { useEffect, useState } from 'react';
import { PieChart as Chart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChart = () => {
    const [data, setData] = useState(null)

    const [COLORS, setCOLORS] = useState(null)

    useEffect(() => {
        setCOLORS(['#ba74fc', '#a855f7', '#8e1ef6'])

        const fecthData = async () => {
            const responsePending = await fetch("/api/peminjaman?status=pending", {
                method: 'GET',
                cache: 'no-store'
            } )
            const responseBorrowed = await fetch("/api/peminjaman?status=borrowed", {
                method: 'GET',
                cache: 'no-store'
            } )
            const responseReturned = await fetch("/api/peminjaman?status=returned", {
                method: 'GET',
                cache: 'no-store'
            } )
            const dataPending = await responsePending.json()
            const dataBorrowed = await responseBorrowed.json()
            const dataReturned = await responseReturned.json()

            setData([
                { name: 'Dipinjam', value: dataBorrowed.status == 200 ? dataBorrowed.data.reduce((sum, jmlPinjam) => sum + jmlPinjam.stock, 0) : 0},
                { name: 'Menunggu', value: dataPending.status == 200 ?  dataPending.data.reduce((sum, jmlPinjam) => sum + jmlPinjam.stock, 0) : 0},
                { name: 'Kembali', value: dataReturned.status == 200 ? dataReturned.data.reduce((sum, jmlPinjam) => sum + jmlPinjam.stock, 0) : 0 },
            ])
        }

        fecthData()
    }, [])


    return (
        <>
            <h1 className="mb-5 text-xl font-medium" >Statistik Status Peminjaman</h1>
            {data == null
                ? null
                : <Chart width={300} height={300}>
                    <Pie
                        data={data}
                        labelLine={false} // Nonaktifkan garis label
                        outerRadius={80} // Radius luar
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => {
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </Chart>
            }
        </>
    )
};

export default PieChart;
