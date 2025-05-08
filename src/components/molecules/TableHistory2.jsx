import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import dataHistory from '../../redux/features/dataHistory';

function TableHistory2() {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const [filterOption, setFilterOption] = useState("today");
    // Fungsi bantu ubah ke objek Date
    const parseIndoDatetime = (str) => {
        if (!str || typeof str !== 'string') return new Date(0); // default: paling lama
        const [datePart, timePart] = str.split(', ');
        const [day, month, year] = datePart.split('/');
        const [hour, minute, second] = timePart.split('.');
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`);
    };


    const sortedHistory = [...dataHistory].sort((a, b) => {
        const sellA = parseIndoDatetime(a.timeSell);
        const buyA = parseIndoDatetime(a.timeBuy);
        const timeA = sellA > buyA ? sellA : buyA;

        const sellB = parseIndoDatetime(b.timeSell);
        const buyB = parseIndoDatetime(b.timeBuy);
        const timeB = sellB > buyB ? sellB : buyB;

        return timeB - timeA; // terbaru ke atas
    });

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(angka);
    };
    // HISTORY HARI INI 
    const getTodayDateString = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const filteredHistory = sortedHistory.filter(item => {
        if (filterOption !== "today") return true;
    
        const timeStr = item.timeSell || item.timeBuy;
        if (!timeStr) return false;
    
        const datePart = timeStr.split(',')[0];
        return datePart === getTodayDateString();
    });


    return (
        <div className="w-full">
            <div className="mb-2">
                <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    <option value="all">All history</option>
                    <option value="today">Today</option>
                </select>
            </div>
            <div className="overflow-y-auto h-[500px] w-full">
                <table className="relative w-full text-sm table-auto">
                    <thead className="sticky top-0 bg-blue-200 z-10">
                        <tr className="bg-blue-200">
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">No</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Time</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Coin</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Type</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Status</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Buy</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Sell</th>
                            <th className="px-1 py-2 text-center text-[10px] font-medium text-white bg-blue-600">Profit</th>

                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {filteredHistory.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-100 border-b-black">
                                <td className={` py-2 text-center text-[10px] border-b border-black `}>{i + 1}</td>
                                <td className={`  text-center text-[10px] ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`}  border-b border-black`}>{(() => {
                                    const datetime = item.timeSell || item.timeBuy;
                                    if (!datetime) return "-";
                                    const [date, time] = datetime.split(', ');
                                    const timeFormatted = time.replace(/\./g, ':'); // ubah semua titik jadi :
                                    return `${timeFormatted}`;
                                })()}</td>
                                <td className={` py-2 text-center text-[10px] border-b border-black  ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`}`}>{item.id}</td>
                                <td className={` py-2 text-center text-[10px] font-bold ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`} ${item.statusSell == "pending" || item.statusSell == "done" ? `text-green-600` : `text-red-600`} border-b border-black`}>{item.statusSell ? "Sell" : "Buy"}</td>
                                <td className={` py-2 text-center text-[10px] font-bold ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`}  border-b border-black ${ item.statusSell == "done" ? `text-green-600` : `text-red-600`}`}>{item.statusSell ? item.statusSell : item.statusBuy}</td>
                                <td className={` py-2 text-center text-[10px] ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`}  border-b border-black`}>{item.buyAmount ? formatRupiah(Number(item.buyAmount) * Number(item.buyPrice)) : "-"
                                }</td>
                                <td className={` py-2 text-center text-[10px] ${item.statusSell == "done" ? `bg-green-200` : `bg-red-100`}  border-b border-black`}>{item.amountSell
                                    ? formatRupiah((item.amountSell * item.sellPrice) * 0.997778) : "-"}</td>
                                <td className={`py-2 text-center text-[10px] ${item.statusSell == "done" ? `bg-green-600 text-white font-medium` : `bg-red-100`} border-b border-black`}>{item.statusSell === "done"
                                    ? formatRupiah(
                                        (item.amountSell * item.sellPrice * 0.997778) -
                                        (item.buyAmount * item.buyPrice)
                                    )
                                    : "-"}</td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableHistory2