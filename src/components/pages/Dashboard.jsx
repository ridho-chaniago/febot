import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio';

const Dashboard = () => {
    const [updatedBalances, setUpdatedBalances] = useState([]); // Tambahkan state untuk menyimpan updatedBalances
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idr, setIdr] = useState(0);
    let i = 1;

    async function fetchData(item) {
        try {
            // const dataReady = await axios.get('http://192.168.11.201:3000/api/balance');
            // const dataReady = await axios.get('http://localhost:3000/api/balance');
            const dataReady = await axios.get('https://bot.serveo.net/api/balance');
            setUpdatedBalances(dataReady.data.data.ticker); // Menyimpan updatedBalances ke state updatedBalances
            setIdr(dataReady.data.data.idr); // Menyimpan updatedBalances ke state updatedBalances
            // console.log(dataReady.data)
            setLoading(false);
            // const dataHistoryResponse = await axios.get('http://192.168.11.201:3000/api/history');
            const dataHistoryResponse = await axios.get('https://bot.serveo.net/api/history');
            // const dataHistoryResponse = await axios.get('http://localhost:3000/api/history');
            const dataHistory = dataHistoryResponse.data
                .map(item => {
                    const timeBuyLocal = item.timeBuy
                        ? new Date(item.timeBuy).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
                        : "-";

                        const timeFilter= item.timeBuy
                        ? item.timeBuy.split("T")[0]  // hanya ambil tanggalnya (yyyy-mm-dd)
                        : "-";

                    const timeSellLocal = item.timeSell
                        ? new Date(item.timeSell).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
                        : "-";

                    return {
                        ...item,
                        timeBuyLocal,
                        timeSellLocal,
                        timeFilter,
                    };
                })
                .slice()
                .reverse(); // data terbaru paling atas



            setHistory(dataHistory);
            console.log(dataHistory)

        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError('Gagal mengambil data');
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);
    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-blue-100 ">

            <a href="#top">
                <button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded fixed bottom-4 right-4'>          Top
                </button>
            </a>


            <Portfolio idr={idr} updatedBalances={updatedBalances} history={history} />
        </div>
    );
};

export default Dashboard;