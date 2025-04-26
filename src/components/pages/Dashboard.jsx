import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCoin } from '../../redux/features/dataCoin';
import { setDataHistory } from '../../redux/features/dataHistory';
import { setDataProfit } from '../../redux/features/dataProfit';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let i = 1;

    const dispatch = useDispatch();
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);

    function ft(finishTime) {
        const d = new Date(finishTime * 1000);
        const tanggal = d.getDate();
        const bulan = d.getMonth() + 1;
        const tahun = d.getFullYear();
        return `${tanggal}/${bulan}/${tahun}`;
    }
    const soldTransactions = dataHistory.filter(item => item.finish_time).map(item => ({ ...item, finish_time: ft(Number(item.finish_time)) }));
    const profitByDate = {};

    soldTransactions.forEach(item => {
        const sellDate = item.finish_time;
        const profit = Math.ceil((Number(item.sellPrice) - Number(item.buyPrice)) * Number(item.amountSell));

        if (!profitByDate[sellDate]) {
            profitByDate[sellDate] = {
                profit: profit,
                totalSell: 1,
            };
        } else {
            profitByDate[sellDate].profit += profit;
            profitByDate[sellDate].totalSell += 1;
        }
    });
    const profitByDateArray = Object.entries(profitByDate).map(([date, data]) => ({
        date,
        profit: data.profit,
        totalSell: data.totalSell,
    }));
    dispatch(setDataProfit(profitByDateArray));
    console.log("Data Profit:", profitByDateArray);
    async function fetchData(item) {
        try {
            // const dataReady = await axios.get('http://192.168.11.201:3000/api/balance');
            const dataReady = await axios.get('http://localhost:3000/api/balance');
            // const dataReady = await axios.get('https://bot.serveo.net/api/balance');
            dispatch(setDataCoin(dataReady.data.data.ticker));
            setLoading(false);
            // const dataHistoryResponse = await axios.get('http://192.168.11.201:3000/api/history');
            // const dataHistoryResponse = await axios.get('https://bot.serveo.net/api/history');
            const dataHistoryResponse = await axios.get('http://localhost:3000/api/history');
            const dataHistoryy = dataHistoryResponse.data
                .map(item => {
                    const timeBuy = item.timeBuy ? new Date(item.timeBuy) : null;
                    const timeSell = item.timeSell ? new Date(item.timeSell) : null;

                    return {
                        ...item,
                        timeBuyLocal: timeBuy ? timeBuy.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) : "-",
                        timeSellLocal: timeSell ? timeSell.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) : "-",
                        timeFilter: timeBuy ? item.timeBuy.split("T")[0] : "-",
                    };
                })
                .reverse(); // Data terbaru paling atas

            dispatch(setDataHistory(dataHistoryy));
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError('Gagal mengambil data');
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData(); // jalan sekali waktu mount
    
        const intervalId = setInterval(() => {
            fetchData(); // jalan setiap 10 detik
        }, 10000);
    
        return () => clearInterval(intervalId); // bersihkan interval saat unmount
    }, []);
    
    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;}
    if (error) {return <p className="text-center text-red-500">{error}</p>;}
    return (
        <div className="min-h-screen bg-blue-100 ">
            <a href="#top">
                <button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded fixed bottom-4 right-4'>          Top
                </button>
            </a>
            <Portfolio />
        </div>
    );
};
export default Dashboard;