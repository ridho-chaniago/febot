import React from 'react'

function Table({ pair, avg, buy, sell, balance, i, idr }) {
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


    // Menentukan warna dan keterangan berdasarkan kedekatan avg dengan buy atau sell
    const textColor = "text-white";  // Tetap putih karena itu sesuai dengan tampilan

    const distanceToBuy = Math.abs(avg - buy); // Selisih absolut antara avg dan buy
    const distanceToSell = Math.abs(avg - sell); // Selisih absolut antara avg dan sell
    let readyBuy = false;
    let readySell = false;

    // Tentukan mana yang lebih dekat
    if (distanceToBuy < distanceToSell) {
        readySell = true;
    } else if (distanceToSell < distanceToBuy) {
        readyBuy = true;
    }
    const persen = readySell ? sellPercentage : buyPercentage
    // Tentukan harga yang relevan
    const relevantPrice = readySell ? buy : sell;
    const relevantPriceLabel = readySell ? "Buy Price" : "Sell Price";
    // const saldoCoin = readySell ?  : "Bersiap untuk membeli";

    let ketSell = ""
    let colorTextKetSell = ""
    let bgColorSell = '';
    let ketBuy = ""
    let colorTextKetBuy = ""
    let bgColorBuy = '';
    if (readySell && (balance * buy > 10500)) {
        ketSell = "Bersiap untuk menjual"
        colorTextKetSell = 'text-green-600'
        bgColorSell = "bg-green-600"
    } else {
        ketSell = "koin tidak cukup"
        colorTextKetSell = 'text-red-600'
        bgColorSell = "bg-green-600"
    }

    if (readyBuy && (idr >= 11000)) {
        ketBuy = "bersiap untuk membeli"
        colorTextKetBuy = 'text-green-600'
        bgColorBuy = "bg-red-300"
    } else {
        ketBuy = "idr tidak cukup"
        colorTextKetBuy = 'text-red-600'
        bgColorBuy = "bg-red-600"
    }
    
    return (
        <tr key={pair} className="border-b-black mb-5 hover:bg-gray-100">
            <td className={`px-6 py-2 bg-gray-200 `}>{i++}</td>
            <td className={`px-6 py-2 `}>{pair}</td>
            {readySell ?
                (<td className={`px-2 w-1 py-2 text-white font-bold text-center ${bgColorSell}`}> {persen}%</td>)
                :
                (<td className={`px-2 py-2 w-1 text-white font-bold text-center ${bgColorBuy}`}> {persen}%</td>)}
            {readySell ?
                (<td className={`px-6 py-2   ${colorTextKetSell}`}>  {ketSell}</td>)
                :
                (<td className={`px-6 py-2  ${colorTextKetBuy}`}>{ketBuy}</td>)}
            <td className={`px-6 py-2 bg-gray-200 `}>{balance}</td>
            <td className={`px-6 py-2  `}>Rp. {Math.floor(balance * buy)}</td>
            <td className={`px-6 py-2 bg-gray-200`}>{avg}</td>
            <td className={`px-6 py-2 bg-green-100`}>{buy}</td>
            <td className={`px-6 py-2 bg-red-100`}>{sell}</td>
        </tr>
    )
}

export default Table