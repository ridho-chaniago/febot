// History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableHistory from '../molecules/TableHistory';

const History = () => {
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
    
    // Fungsi untuk mendapatkan riwayat transaksi
    const fetchHistory = async () => {
        try {
            const response = await axios.get('https://bot.serveo.net/history');
            const dataNow = response.data.reverse();
            console.log(dataNow)
            const today = selectedDate; // hasil: '2025-04-12'
            const todayData = dataNow.filter(item => {
                const rawDate = item.date.split(',')[0]; // "11/4/2025"
                const [day, month, year] = rawDate.split('/');
                // Bikin format jadi "2025-04-11"
                const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

                return formatted === today;
            });
            console.log(todayData)
            // const todayData = dataNow.filter(item => item.date === today);
            setHistory(todayData)




        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    // Fungsi untuk melakukan sorting data

    const buyData = history.filter(item => item.type === 'buy');
    const sellData = history.filter(item => item.type === 'sell');
    useEffect(() => {
        fetchHistory(); // Ambil history saat komponen pertama kali dirender
    }, [selectedDate]);

    return (
        <div>


            {/* Tombol untuk sorting */}
            <div className="flex space-x-4 mb-4 items-center justify-center flex-col mt-10">
                <h2>Riwayat Transaksi</h2>

                <input
                    type="date"
                    className="border p-2 rounded"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            <div>
                {/* Kolom BUY */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-green-600 mb-2">BUY {buyData.length}</h2>
                        <TableHistory history={buyData} />
                    </div>

                    {/* Kolom SELL */}
                    <div>
                        <h2 className="text-xl font-bold text-red-600 mb-2">SELL {sellData.length}</h2>
                        <TableHistory history={sellData} />
                    </div>

                </div>
            </div>


        </div>
    );
};

export default History;
