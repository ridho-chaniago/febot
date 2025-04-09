// History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [history, setHistory] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

    // Fungsi untuk mendapatkan riwayat transaksi
    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://192.168.11.201:3000/history');
            setHistory(response.data.reverse());

            console.log(history)


        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    // Fungsi untuk melakukan sorting data
    const sortData = (key) => {
        let direction = 'ascending';

        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...history].sort((a, b) => {
            if (key === 'date') {
                const dateA = new Date(a[key]);
                const dateB = new Date(b[key]);
                return direction === 'ascending' ? dateA - dateB : dateB - dateA;
            }

            if (key === 'type') {
                return direction === 'ascending'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }

            return 0;
        });

        setHistory(sortedData);
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        fetchHistory(); // Ambil history saat komponen pertama kali dirender
    }, []);

    return (
        <div>
            <h2>Riwayat Transaksi</h2>

            {/* Tombol untuk sorting */}
            <div className="flex space-x-4 mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => sortData('type')}
                >
                    Sort by Type
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => sortData('date')}
                >
                    Sort by Date
                </button>
            </div>

            <table className="min-w-full bg-white table-auto border border-black rounded">
                <thead className="sticky top-16 w-full">
                    <tr className="bg-blue-200">
                        <th className="px-4 py-2 text-left font-medium text-gray-600">No</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Coin</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Type</th>
                        <th className="px-10 py-2 text-left font-medium text-gray-600">Price</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Amount</th>
                        <th className="px-6 py-2 text-left font-medium text-gray-600">IDR</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {history.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className={`px-6 py-2 bg-gray-200`}>{index + 1}</td>
                            <td className={`px-6 py-2`}>{item.pair}</td>
                            <td className={`px-6 py-2`}>{item.type}</td>
                            <td className={`px-6 py-2`}>
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,  // Menghilangkan angka di belakang koma
                                    maximumFractionDigits: 0   // Menghilangkan angka di belakang koma
                                }).format(item.amountInIDR / item.amountInCoin)}
                            </td>
                            <td className={`px-4 py-2`}>{(item.amountInCoin.toFixed(5))}</td>
                            <td className={`px-6 py-2`}>
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,  // Menghilangkan angka di belakang koma
                                    maximumFractionDigits: 0   // Menghilangkan angka di belakang koma
                                }).format(item.amountInIDR)}
                            </td>
                            <td className={`px-6 py-2`}>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
