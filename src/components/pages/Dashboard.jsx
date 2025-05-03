import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCoin } from '../../redux/features/dataCoin';
import { setDataHistory } from '../../redux/features/dataHistory';
import { setDataProfit } from '../../redux/features/dataProfit';
import { useMediaQuery } from '@mui/material';
import { data } from 'autoprefixer';
import Portfolio2 from './Portofolio2';
import {api} from '../../config/config.js';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let i = 1;
    const [idrHold, setIdrHold] = useState(0);
    const dispatch = useDispatch();
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    // Format tanggal
    function ft(unixTime) {
        const d = new Date(unixTime * 1000);
        const tanggal = d.getDate();
        const bulan = d.getMonth() + 1;
        const tahun = d.getFullYear();
        return `${tanggal}/${bulan}/${tahun}`;
    }
    const soldTransactions = dataHistory
        .filter(item => item.finish_time)
        .map(item => ({
            ...item,
            sellDate: ft(Number(item.finish_time)) // <<< konsisten formatting
        }));

    // Inisialisasi
    const profitByDate = {};

    soldTransactions.forEach(item => {
        const sellDate = item.sellDate;
        const profit = Math.ceil((Number(item.sellPrice) - Number(item.buyPrice)) * Number(item.amountSell));

        if (!profitByDate[sellDate]) {
            profitByDate[sellDate] = {
                profit: profit,
                totalSell: 1,
            };
        } else {
            profitByDate[sellDate].profit = (profitByDate[sellDate].profit || 0) + profit;
            profitByDate[sellDate].totalSell = (profitByDate[sellDate].totalSell || 0) + 1;
        }
    });

    // Jadiin array
    const profitByDateArray = Object.entries(profitByDate).map(([date, data]) => ({
        date,
        profit: data.profit || 0,
        totalSell: data.totalSell || 0,
        totalBuy: data.totalBuy || 0
    }));
    console.log(profitByDate)
    // Dispatch ke redux atau state
    dispatch(setDataProfit(profitByDateArray));

    async function fetchData(item) {
        try {
            const dataReady = await axios.get(api.balance, {
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                }
              });
            console.log("dataReady:", dataReady);  // Menampilkan seluruh data yang diterima dari server
            console.log("dataReady.data:", dataReady.data);  // Memeriksa bagian 'data' dari respons
            console.log("dataReady.data.data:", dataReady.data.data);  // Memeriksa bagian dalam 'data'
            console.log("idrHold:", dataReady.data.data?.idrHold);  // Mengakses idrHold dengan pengecekan

            console.log(dataReady.status)
            const idrHold = dataReady.data.data.idrHold
            console.log("data ready", dataReady)
            setIdrHold(idrHold)
            dispatch(setDataCoin(dataReady.data.data.ticker));
            setLoading(false);
            const dataHistoryResponse = await axios.get(api.history, {
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                }
              });
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
            console.log("ini data ", dataReady.data.data.ticker)

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
        return <p className="text-center text-blue-500">Loading...</p>;
    }
    if (error) { return <p className="text-center text-red-500">{error}</p>; }
    return (
        <div className="min-h-screen bg-blue-100 ">
            {/* <a href="#top">
                <button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded fixed bottom-4 right-4'>          Top
                </button>
            </a> */}
            {isSmallScreen ? <Portfolio2 idrHold={idrHold} /> : <Portfolio idrHold={idrHold} />}
        </div>
    );
};
export default Dashboard;