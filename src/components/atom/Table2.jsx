
import React, { useEffect } from 'react';


function Table2({ pair, avg, buy, sell, i, totalIdr, last, history, balance, sellCompleteLength, profitIdr }) {
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

        <tr key={pair} className=" mb-5 hover:bg-gray-100">
            <td className="px-2 text-center text-[10px] py-2 bg-gray-200 w-auto whitespace-nowrap">{i++}</td>
            <td className={`px-2 text-center text-xs py-2 `}>{pair}</td>
            <td className={`px-2 text-[10px] w-1 py-2 text-white  text-center ${bgColorSell}`}> {persen.toFixed(2)}%</td>
            <td className={`px-2 pl-6 text-[10px] bg-gray-100 ${colorTextKetSell}`}>Rp.{Math.floor(avg).toLocaleString('id-ID')}</td>
            <td className={`px-2 pl-6 text-[10px]  bg-gray-200 `}>Rp.{Math.floor(Number(ketSell)).toLocaleString('id-ID')}</td>
            <td className={`px-6 pl-6 text-[10px]   `}>Rp.{Math.floor(totalIdr).toLocaleString('id-ID')}</td>
        </tr>

    )
}

export default Table2