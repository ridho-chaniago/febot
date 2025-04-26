import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import dataHistory from '../../redux/features/dataHistory';

function TableHistory() {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
function ft(finishTime) {
    
            const d = new Date(finishTime * 1000);

            const tanggal = d.getDate();
            const bulan = d.getMonth() + 1;
            const tahun = d.getFullYear();

            const jam = d.getHours().toString().padStart(2, '0');
            const menit = d.getMinutes().toString().padStart(2, '0');
            const detik = d.getSeconds().toString().padStart(2, '0');

            return `${tanggal}/${bulan}/${tahun}, ${jam}.${menit}.${detik}`;
        

    }
    // console.log(ft(1745518358)); // Harusnya tampil waktu yang jelas

    return (
        <div><table className="min-w-full bg-white table-auto border border-black rounded">
            <thead className="sticky top-16 w-full">
                <tr className="bg-blue-200">
                    <th className="px-4 py-2 text-left font-xs text-gray-600">No</th>
                    <th className="px-4 py-2 text-left font-xs text-gray-600">Coin</th>
                    <th className="px-10 py-2 text-left font-xs text-white bg-green-400">Price Buy</th>
                    <th className="px-4 py-2 text-left font-xs text-white bg-green-400">Amount Buy</th>
                    <th className="px-4 py-2 text-left font-xs text-white bg-green-400">Time Buy</th>
                    <th className="px-4 py-2 text-left font-xs text-white bg-green-400">Status Buy</th>
                    <th className="px-10 py-2 text-left font-xs text-white bg-red-400">Price Sell</th>
                    <th className="px-4 py-2 text-left font-xs text-white bg-red-400">Amount Sell</th>
                    <th className="px-4 py-2 text-left font-xs text-white bg-red-400">Time Sell</th>
                    <th className="px-6 py-2 text-left font-xs text-white bg-red-400">Status Sell</th>
                    <th className="px-6 py-2 text-left font-xs text-gray-600">Profit</th>
                    <th className="px-6 py-2 text-left font-xs text-gray-600">Finish Time</th>

                </tr>
            </thead>
            <tbody className="bg-gray-100">
                {dataHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 border-b-black">
                        <td className={`px-6 py-2 bg-gray-200`}>{index + 1}</td>
                        <td className={`px-6 py-2`}>{item.id}</td>
                        <td className={`px-6 py-2`}>
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(item.buyPrice)}
                        </td>
                        <td className={`px-4 py-2`}>{Number(item.buyAmount).toFixed(2)}</td>
                        <td className={`px-4 py-2`}>{item.timeBuyLocal}</td>
                        <td className={`px-4 py-2 ${item.statusBuy === "filled" ? "bg-green-200" : "bg-red-200"}`}>{item.statusBuy}</td>
                        <td className="px-6 py-2">
                            {typeof item.sellPrice === "number"
                                ? new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(item.sellPrice)
                                : "-"}
                        </td>
                        <td className={`px-4 py-2`}>{Number(item.amountSell ?? 0).toFixed(2)}

                        </td>
                        <td className={`px-4 py-2`}>{item.timeSellLocal}</td>
                        <td className={`px-4 py-2 ${!item.statusSell ? "" : (item.statusSell === "done" ? "bg-green-200" : "bg-red-200")}`}>
                            {item.statusSell ?? "-"}
                        </td>

                        <td className={`px-4 py-2`}>{item.statusSell === "done" ? "Rp." + ((Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice))).toFixed(0) : 0}</td>
                        <td className={`px-4 py-2`}>{item.finish_time ? ft(item.finish_time) : "-"}</td>
                        {/* <td className={`px-6 py-2`}>
                            {(item.date).split(',')[1].trim()}
                        </td> */}
                    </tr>
                ))}

            </tbody>
        </table> </div>
    )
}

export default TableHistory