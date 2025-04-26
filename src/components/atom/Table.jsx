
import React, { useEffect } from 'react';


function Table({ pair, avg, buy, sell, i, totalIdr, last, history,balance, sellCompleteLength,profitIdr}) {
    // console.log(`ini ${pair} avg ${avg} buy ${buy} sell ${sell} last ${last} balance ${balance}`)

    const calculatePercentage = (price, referencePrice) => {
        const diff = (price - referencePrice);  // Selisih antara avg dan harga
        return ((diff / referencePrice) * 100).toFixed(2);  // Menghitung persentase dan membulatkan hingga 2 desimal
    };

    const calculateBalanceInRupiah = (coinPrice, coinAmount) => {
        return coinPrice * coinAmount;
    };
    // Menghitung persentase untuk Buy dan Sell
    const buyPercentage = calculatePercentage(sell, avg);
    const sellPercentage = calculatePercentage(buy, avg);
    const persen = avg ? ((last - avg) / avg) * 100 : 0;


    let ketSell = ""
    let colorTextKetSell = ""
    let bgColorSell = '';
    let ketBuy = ""
    let colorTextKetBuy = ""
    let bgColorBuy = '';
    if (avg >= last) {
        ketSell = last.toLocaleString('id-ID')
        colorTextKetSell = 'text-red-600'
        bgColorSell = "bg-red-600"
    } else {
        ketSell = last.toLocaleString('id-ID')
        colorTextKetSell = 'text-green-600'
        bgColorSell = "bg-green-600"
    }


    return (

        <tr key={pair} className="border-b-black mb-5 hover:bg-gray-100">
            <td className={`px-6 py-2 bg-gray-200 `}>{i++}</td>
            <td className={`px-6 py-2 `}>{pair}</td>
            <td className={`px-2 w-1 py-2 text-white font-bold text-center ${bgColorSell}`}> {persen.toFixed(2)}%</td>
            <td className={`px-6 py-2 bg-gray-200 `}>{balance > 0.1 ? balance.toFixed(2) : balance.toFixed(6)}</td>
            <td className={`px-2 py-2 bg-gray-100 ${colorTextKetSell}`}>Rp.{Math.floor(avg).toLocaleString('id-ID')}</td>
            <td className={`px-2 py-2  bg-gray-200 `}>Rp.{Math.floor(Number(ketSell)).toLocaleString('id-ID')}</td>
            <td className={`px-2 py-2 text-sm  `}>Rp.{Math.floor(totalIdr).toLocaleString('id-ID')}</td>
            <td className={`px-6 py-2 bg-green-100`}>{`sell Completed: ${sellCompleteLength}  `}</td>
            <td className={` py-2 bg-red-100`}>{`Profit Idr : ${Number(profitIdr.toFixed(2)).toLocaleString('id-ID')}`}</td>
        </tr>

    )
}

export default Table