// History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableHistory from '../molecules/TableHistory';                   

const History = ({history, dataBal, idr}) => {
    // const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

    // Fungsi untuk mendapatkan riwayat transaksi
    const fetchHistory = async () => {
        try {
            const response = await axios.get('https://bot.serveo.net/api/history');
            const dataNow = response.data.reverse();
            const today = selectedDate;
            const todayData = dataNow.filter(item => {
                const date = new Date(item.timeBuy).toLocaleDateString('id-ID', {
                    timeZone: 'Asia/Jakarta'
                }); // hasil: "11/4/2025"

                const [day, month, year] = date.split('/');
                const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                return formatted === today;
            });
            
            setHistory(todayData)




        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };
    history.sort((a, b) => {
        const parseDate = (str) => {
            const [datePart, timePart] = str.split(', ');
            const [day, month, year] = datePart.split('/').map(Number);
            const [hour, minute] = timePart.split('.').map(Number);
            return new Date(year, month - 1, day, hour, minute);
        };

        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB - dateA; // descending order (terbaru dulu)
    });

    // console.table(history);

    // Fungsi untuk melakukan sorting data
    const buyData = history.filter(item => item.type === 'buy');
    const sellData = history.filter(item => item.type === 'sell');
    useEffect(() => {
        const interval = setInterval(() => {
            fetchHistory();
        }, 10000); // 
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-green-600 mb-2">
                            BUY {buyData.length}
                        </h2>
                        <TableHistory history={buyData} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-red-600 mb-2">
                            SELL {sellData.length}
                        </h2>
                        <TableHistory history={sellData} />
                    </div>
                </div>

            </div>


        </div>
    );
};

export default History;
