import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../atom/Table';
import Portfolio from './Portfolio';
import TableDashboard from '../molecules/TableDashboard';

const Dashboard = () => {
    const [updatedBalances, setUpdatedBalances] = useState([]); // Tambahkan state untuk menyimpan updatedBalances
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let i = 1;
    useEffect(() => {
        async function fetchData(item) {
            try {
                const dataReady = await axios.get('https://bot.serveo.net/data-ready');
                setUpdatedBalances(dataReady.data); // Menyimpan updatedBalances ke state updatedBalances
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError('Gagal mengambil data');
                setLoading(false);
            }
            // console.log(updatedBalances);
        }

        fetchData();
        const intervalId = setInterval(fetchData, 20000); // 5000ms = 5 detik

        // Clean up interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, []);
    const idrBalance = updatedBalances.find((pair) => pair.pair === "idr");
    const idr = idrBalance ? idrBalance.balance : 0;
    const total = updatedBalances.reduce((sum, item) => {
        const balance = item.balance;
        const sell = parseFloat(item.sell); // Mengubah sell ke angka

        // Pastikan sell dan balance adalah angka yang valid
        if (isNaN(sell) || isNaN(balance)) {
            console.warn(`Data invalid pada pair: ${item.pair}. Sell: ${item.sell}, Balance: ${item.balance}`);
            return sum; // Jika invalid, lewati item ini
        }

        return sum + (balance * sell); // Menambahkan hasil perkalian ke total
    }, 0);

    // console.log(Math.floor(total));
    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }
    const sortedBalances = updatedBalances.sort((a, b) => (b.balance * b.buy) - (a.balance * a.buy));
    const totalNegativePercent = updatedBalances.reduce((sum, item) => {
        // Pastikan avg dan sell adalah angka
        const avg = parseFloat(item.avg);  // Mengkonversi avg menjadi angka
        const sell = parseFloat(item.sell);  // Mengkonversi sell menjadi angka

        // Menghitung persen perubahan
        const persen = Math.floor(((avg - sell) / avg) * 100);

        // Cek jika persen negatif, kemudian floor dan tambahkan ke total
        if (persen > 0) {
            sum += Math.floor(persen); // Math.floor untuk membulatkan persen negatif
        }

        return sum;
    }, 0);

    // console.log(`Total Negative Percent: ${totalNegativePercent} X 11000 = ${totalNegativePercent * 11000}`); // Menampilkan jumlah total persen negatif



    return (
        <div className="min-h-screen bg-blue-100 ">

            <a href="#top">
                <button className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded fixed bottom-4 right-4'>          Top
                </button>
            </a>


            <Portfolio total={total} idr={idr} sortedBalances={sortedBalances} totalNegativePercent={totalNegativePercent} />

            {/* <div className="container mx-auto flex flex-col justify-center items-center">
                <h1 id='top' className="text-3xl px-10 font-semibold text-center mb-6 text-gray-800">You need Deposite {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalNegativePercent * 11000)}</h1>
                <table className="min-w-full bg-white table-auto border border-black rounded">
                    <thead className='sticky top-16 w-full '>
                        <tr className="bg-blue-200">
                            <th className="px-4 py-2 text-left font-medium text-gray-600">No</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Coin</th>
                            <th className="px-4 py-2  text-center font-medium text-gray-600">Change %</th>
                            <th className="pl-14 py-2 text-left font-medium text-gray-600">Ket</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Balance</th>
                            <th className="px-6 py-2 text-left font-medium text-gray-600">IDR</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Avg Buy</th>
                            <th className="px-4 py-2 text-left font-medium bg-green-400 text-gray-600">Market Buy</th>
                            <th className="px-4 py-2 text-left font-medium bg-red-400 text-gray-600">Market Sell</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {sortedBalances.map((allBalance, index) => (
                            <Table negatif={totalNegativePercent} pair={allBalance.pair} avg={allBalance.avg} sell={allBalance.sell} buy={allBalance.buy} balance={allBalance.balance} idr={idr} i={index + 1} />
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
        // </div>
    );
};

export default Dashboard;