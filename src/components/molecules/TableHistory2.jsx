import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import dataHistory from '../../redux/features/dataHistory';

function TableHistory2() {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
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
      
      
    return (
        <div className="overflow-y-auto h-[500px] w-full">
            <div className="overflow-x-auto">
                <table className="table-fixed border-collapse border border-black">
                    <tbody className='border border-black'>

                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Coin</th>
                            {sortedHistory.map((item, i) => (
                                <td key={i} className=" text-white text-center text-sm font-medium bg-blue-600 border border-b-0 border-black">{item.id}</td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Type</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-200`:`bg-red-100`} text-sm border-r border-black`}>{item.statusSell?"Sell":"Buy"}</td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Time</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-200`:`bg-red-100`} text-sm border-r border-black`}>{item.timeSell?item.timeSell:item.timeBuy}</td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Status</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-200`:`bg-red-100`} text-sm border-r border-black`}>{item.statusSell?item.statusSell:item.statusBuy}</td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Sell</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-200`:`bg-red-100`} text-sm border-r border-black`}>{item.amountSell
                                    ? formatRupiah((item.amountSell * item.sellPrice) * 0.997778)
                                    : "-"
                                  }</td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-blue-600 text-white sticky left-0 text-sm z-10 px-2 py-1  border">Buy</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-200`:`bg-red-100`} text-sm border-r border-black`}>{item.buyAmount ? formatRupiah(Number(item.buyAmount) * Number(item.buyPrice)) : "-"
                            }</td>
                            ))}
                        </tr>
                        
                        <tr>
                            <th className="bg-green-600 text-white sticky left-0 text-sm z-10 px-2 py-1 border">Profit</th>
                            {dataHistory.map((item, i) => (
                                <td key={i} className={`px-2 text-center ${item.statusSell=="done"?`bg-green-600 text-white font-medium`:`bg-red-100`} text-sm border-r border-black`}>{item.statusSell === "done"
                                ? formatRupiah(
                                    (item.amountSell * item.sellPrice * 0.997778) -
                                    (item.buyAmount * item.buyPrice)
                                  )
                                : "-"}</td>
                            ))}
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* <table className="relative w-full text-sm table-auto">
                <thead className="sticky top-0 bg-blue-200 z-10">
                    <tr className="bg-blue-200">
                        <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">No</th>
                        <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">Time</th>
                        <th className="px-1 py-2 text-center text-xs font-medium text-white bg-green-400">Coin</th>
                        <th className="px-1 py-2 text-center text-xs font-medium text-white bg-green-400">Type</th>
                        <th className="px-1 py-2 text-center text-xs font-medium text-white bg-green-400">Status</th>
                        <th className="px-1 py-2 text-center text-xs font-medium text-white bg-green-400">Profit</th>

                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {dataHistory.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 border-b-black">
                            <td className={`px-1 py-2 text-center text-xs  bg-gray-200`}>{index + 1}</td>
                            <td className={`px-1 py-2 text-center text-xs`}>{item.finish_time ? ft(item.finish_time) : "-"}</td>
                            <td className={`px-1 py-2 text-center text-xs `}>{item.id}</td>
                            <td className={`px-1 py-2 text-center text-xs `}>{item.id}</td>
                            <td className={`px-1 py-2 text-center text-xs  *:${item.statusBuy === "filled" ? "bg-green-200" : "bg-red-200"}`}>{item.statusBuy}</td>
                            <td className={`px-1 py-2 text-center text-xs`}>{item.statusSell === "done" ? "Rp." + ((Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice))).toFixed(0) : 0}</td>
                            
                        </tr>
                        
                    ))}

                </tbody>
            </table>  */}
        </div>
    )
}

export default TableHistory2