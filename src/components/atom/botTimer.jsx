import React, { useEffect, useState } from 'react';
import { waktuMulai } from '../../config/config';
import { useSelector } from 'react-redux';

export default function BotTimer({ totalSellLength, totalProfit, deposite }) {
    const [elapsedTime, setElapsedTime] = useState(0);

    // Ambil waktu pukul 00:01 WIB hari ini

    const getStartTime = waktuMulai()

    useEffect(() => {
        const startTime = getStartTime;

        const interval = setInterval(() => {
            const now = Date.now();
            setElapsedTime(now - startTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const getTodayJakarta = () => {
        const date = new Date();
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Jakarta' // ⬅️ WIB
        }).format(date).replace(/:/g, '.'); // ⬅️ titik pemisah waktu
    };
    const profitByDateArray = useSelector(state => state.dataProfit);
    const dataHistory = useSelector(state => state.dataHistory);
    const sellOneDay = dataHistory.filter(item => item.statusSell === "done" && (item.timeSell).split(',')[0] == getTodayJakarta()).length

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const cleanProfit = String(totalProfit).replace(/\./g, ""); // hilangkan semua titik
    const avgDayRupiah = (Number(days) > 0)
        ? (Number(cleanProfit) / Number(days))
        : 0;

    const depositeRupiah = Number(deposite)
    const timeTakeProfite = (depositeRupiah - (Number(cleanProfit))) / avgDayRupiah
    if (isNaN(cleanProfit) || isNaN(days) || days === 0) {
        console.warn("Invalid input:", cleanProfit, days);
    }

    const avgDay = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(avgDayRupiah);

    return (
        <div>
            <p className={`text-sm text-gray-500 text-center`}>
                Project ini di bangun dengan modal Rp. {Number(deposite.toFixed(0)).toLocaleString('id-ID')}
            </p>
            <div className="text-center text-xs text-green-600">
                <p>⏱ dan sudah beroperasi selama {days} hari {hours} jam.</p>
                <p>Kendaraan yang melewati jalan tol hari ini sebanyak <span className='font-bold'>{sellOneDay}</span> kendaraan,
                    dengan keuntungan <span className='font-bold'>{profitByDateArray.length > 0 && profitByDateArray[0].profit
                        ? `Rp. ${Math.floor(Number(profitByDateArray[0].profit) * 0.97888).toLocaleString('id-ID')}`
                        : 'Rp. -'}</span></p>
            </div>
            <div className="text-center text-xs text-green-600">
                <p>💸 Rata-rata keuntungan perhari selama jalan tol beroperasi <span className='font-bold'>{avgDay}</span></p>
            </div>
            <div className="text-center text-xs text-green-600">
                <p>Estimasi balik modal +- <span className='font-bold'>{Math.floor(timeTakeProfite)}</span> hari lagi</p>
            </div>

        </div>

    );
}
