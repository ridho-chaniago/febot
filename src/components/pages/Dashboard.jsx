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
import { api } from '../../config/config.js';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let i = 1;
    const [idrHold, setIdrHold] = useState(12);
    const dispatch = useDispatch();
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    // Format tanggal

    const soldTransactions = dataHistory
        .filter(item => item.timeSell && item.statusSell === 'done')
        .map(item => ({
            ...item,
            sellDate: item.timeSell.split(',')[0] // <<< konsisten formatting
        }));
    // console.log("data History", dataHistory)
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
    // Dispatch ke redux atau state
    dispatch(setDataProfit(profitByDateArray));

    async function fetchData(item) {
        try {
            const dataReady = await axios.get(api.balance);
            const idrHoldd = dataReady.data.idrHold
            // console.log("data ready", dataReady)
            setIdrHold(idrHoldd)
            dispatch(setDataCoin(dataReady.data.ticker));
            setLoading(false);
            // DATA HISTORY WIB
            const toLocalIndoFormat = (value) => {
                try {
                    if (!value) return null;

                    let date;

                    if (typeof value === 'number') {
                        // Detik: 10 digit, Milidetik: 13 digit
                        if (value.toString().length === 10) {
                            date = new Date(value * 1000); // dari detik → milidetik
                        } else {
                            date = new Date(value); // sudah milidetik
                        }
                    } else if (!isNaN(value)) {
                        // Jika string angka
                        const num = Number(value);
                        if (value.length === 10) {
                            date = new Date(num * 1000);
                        } else {
                            date = new Date(num);
                        }
                    } else {
                        date = new Date(value); // ISO string
                    }

                    if (isNaN(date.getTime())) {
                        throw new Error(`Invalid date: ${value}`);
                    }

                    return new Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                        timeZone: 'Asia/Jakarta'
                    }).format(date).replace(/:/g, '.');
                } catch (err) {
                    console.error("❗ Invalid date value:", value);
                    return null;
                }
            };
            const dataHistoryResponse = await axios.get(api.history);
            const dataHistoryy = dataHistoryResponse.data
                .map(item => {
                    return {
                        ...item,
                        timeBuy: item.timeBuy ? toLocalIndoFormat(item.timeBuy) : null,
                        timeSell: item.finish_time ? toLocalIndoFormat(Number(item.finish_time) * 1000) : item.timeSell ? toLocalIndoFormat(item.timeSell) : null
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