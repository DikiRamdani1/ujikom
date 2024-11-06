'use client';

import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./document";
import { useEffect, useState } from "react";

const DownloadButton = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/generate`);
                const result = await response.json();

                setData(result);
                setLoading(false);
                console.log("Data berhasil diambil");
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <PDFDownloadLink document={<MyDocument api={data} />} fileName="peminjaman.pdf">
                    {({ loading }) => (loading ? 'Loading document...' : 'Unduh PDF')}
                </PDFDownloadLink>
            )}
        </>
    );
};

export default DownloadButton;
