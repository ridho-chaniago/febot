import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function BarPositionPrice2({ pair, last }) {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const base = pair.split('_')[0];
    const minPrice = dataHistory.find(item => item.id === base && item.statusBuy == 'pending' );
    const min = minPrice ? minPrice.buyPrice : 0;
    const maxPrice = dataHistory.filter(item => item.pair === pair && item.statusSell !== 'done' && item.statusSell !== "cancelled");
    // const max = maxPrice.map(item => Number(item.sellPrice)).sort((a, b) => a - b);
    const max = maxPrice
        .map(item => ({
            ...item,
            sellPrice: Number(item.sellPrice) // biar bisa dibandingkan sebagai angka
        }))
        .sort((a, b) => a.sellPrice - b.sellPrice);
    const maxSellPrice = Math.max(...max)
    return (
        <tr key={pair}>
            <td colSpan={6}>
                <div className="flex overflow-x-auto bg-gray-200 border-none whitespace-nowrap w-[470px] gap-1 pb-2">

                    {/* Min */}
                    <div className="relative group text-white h-6 min-w-12 bg-green-500 rounded-lg flex flex-col items-center justify-center">
                        <p className="text-[10px]">
                            {`${(min !== maxSellPrice ? ((min - last) / last) * 100 : 0).toFixed(2)}%`}
                        </p>
                        <div className="absolute bottom-full bg-green-500 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                            Rp.{(Number(min) || 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Last */}
                    <div className="relative group hover:bg-blue-700 cursor-pointer text-white h-6 min-w-12 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <p className="text-[10px]">0%</p>
                        <div className="absolute bottom-full bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                            Rp.{(Number(last) || 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Max Sell */}
                    {max.map((item, index) => (
                        <div
                            key={index}
                            className="relative group text-white h-6 min-w-12 bg-red-500 hover:bg-red-700 cursor-pointer rounded-lg flex flex-col justify-center items-center"
                        >
                            <p className="text-[10px]">
                                {`${(min !== maxSellPrice ? ((item.sellPrice - last) / last) * 100 : 0).toFixed(2)}%`}
                            </p>
                            <div className="absolute top-full z-10 bg-red-600 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300 text-left">
                                {/* <p>ID: {item.idBuy}</p> */}
                                <p>Price: Rp.{Number(item.sellPrice).toLocaleString('id-ID')}</p>
                                <p>Amount Buy: {item.buyAmount}</p>
                                <p>Amount Sell: {item.amountSell}</p>
                                <p>Total IDR: Rp.{(Number(item.amountSell) * Number(last)).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </td>
        </tr>

    )
}

export default BarPositionPrice2