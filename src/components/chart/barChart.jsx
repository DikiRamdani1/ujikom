'use client'; // Menandakan bahwa ini adalah komponen client

import { useEffect, useState } from 'react';
import { BarChart as Chart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = () => {
    const [data, setData] = useState(null);
    const now = new Date();
    const year = now.getFullYear();

    useEffect(() => {


        const fetchData = async () => {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

            try {
                const responses = await Promise.all(
                    monthNames.map(async (_, index) => {
                        try {
                            const response = await fetch(`/api/peminjaman?tahun=${year}&bulan=${index + 1}`, {
                                method: 'GET',
                                cache: 'no-store',
                            });

                            if (!response.ok) throw new Error("Data not found");
                            const data = await response.json();
                            return data || 0;
                        } catch (error) {
                            console.error(`Error fetching data for month ${index + 1}:`, error);
                            return 0; 
                        }
                    })
                );

                const formattedData = responses.map((responseData, index) => ({
                    name: monthNames[index],
                    value: responseData.status == 200 ? responseData.data.reduce((sum, jmlPinjam) => sum + jmlPinjam.stock, 0) : 0,
                }));

                setData(formattedData)

            } catch (e) {
                console.log(e)
            }

        }
        fetchData()

    }, [])
    return (
        <>
            <h1 className="mb-5 text-center text-xl font-medium" >Peminjaman Tahun {year}</h1>
            {data == null
                ? null
                :
                <ResponsiveContainer width="98%" height={300}>
                    <Chart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#a855f7" />
                    </Chart>
                </ResponsiveContainer>}
        </>
    )
}

export default BarChart;
