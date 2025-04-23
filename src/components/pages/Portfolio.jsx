import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import History from '../organisms/History';
import TableDashboard from '../molecules/TableDashboard';
const Portfolio = ({ idr, updatedBalances, history }) => {
    const [dataBal, setDataBal] = useState([]);
    const [inOrderSell, setInOrderSell] = useState(0)
    const [inOrderBuy, setInOrderBuy] = useState(0)
    const wdCoin = 803102
    const wdManual = 512597
    const totalWd = wdCoin + wdManual
    const totalDepo = 50000 + 100133 + 120375 + 2500828 + 200186 + 1000113 + 1000467
    const sisaIdr = totalDepo - totalWd
    const asetCoinInIdr = updatedBalances.reduce((sum, item) => sum + (Number(item.balance) * Number(item.last)), 0);

    useEffect(() => {
        setInOrderSell(frozenSell)
    }, [updatedBalances]);
    console.log("render")
    const totalSell = history.filter(item => item.statusSell === "done").length;
    const allCoinProfitIdr = history
        .filter(item => item.statusSell === "done")
        .reduce((sum, item) => sum + (Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice)), 0);

    const dataDataWithCalc = updatedBalances.map(item => {
        const base = item.pair.split('_')[0];
        const coin = history.filter(h => h.id === base && h.statusBuy == "pending" && !h.statusSell);
        const coinBalance = history.filter(h => h.id === base && h.statusSell !== 'done' && h.statusBuy === 'filled');
        // console.log(coin)
        const balanceSell = coinBalance.reduce((sum, h) => sum + Number(h.buyAmount), 0);
        const balanceBuy = coin.reduce((sum, h) => sum + Number(h.buyAmount), 0);

        const totalIdr = coinBalance.reduce((sum, h) => sum + Number(h.buyAmount) * Number(item.last), 0);
        const coinAvg = history.filter(h => h.id === base && h.statusBuy == 'filled' && h.statusSell == 'pending');

        const avgBuy = coinAvg.length > 0 ? coinAvg.reduce((sum, h) => sum + Number(h.buyPrice), 0) / coinAvg.length : 0;

        const sellComplete = history.filter(h => h.id === base && h.statusSell === "done");
        const sellCompleteLength = sellComplete.length;
        const profitIdr = sellComplete.reduce((sum, h) =>
            sum + (Number(h.amountSell) * Number(h.sellPrice)) - (Number(h.buyAmount) * Number(h.buyPrice)), 0
        );

        return {
            ...item,
            balanceSell,
            totalIdr,
            avgBuy,
            sellCompleteLength,
            profitIdr,
            coinAvg,
            balanceBuy,
        };
    });
    // const updatedBalances=updatedBalances
    // setDataBal(updatedBalances);
    const frozenSell = dataDataWithCalc ? dataDataWithCalc.reduce((sum, item) => sum + item.balanceSell * item.last, 0)
        : 0;

    const frozenBuy = dataDataWithCalc
        ? dataDataWithCalc.reduce((sum, item) => {
            const balance = Number(item.balanceBuy);
            const price = Number(item.buy);
            if (isNaN(balance) || isNaN(price)) {
                console.warn("Invalid data in item:", item);
                return sum;
            }
            return sum + balance * price;
        }, 0)
        : 0;

    const estimasiValue =
    console.log(frozenBuy, "frozenBuy")
    console.log(frozenSell, "frozenSell")
    console.log(asetCoinInIdr, "asetCoinInIdr")
    const persen=((estimasiValue-sisaIdr)/-sisaIdr)*100
    console.log(persen, "persen")
    console.log(estimasiValue, "estimasiValue")
    console.log(sisaIdr, "sisaIdr")
    // const frozenBuy = Array.isArray(updatedBalances)? updatedBalances.reduce((sum, item) =>sum + item.balance * item.last
    // , 0):0;
    const [isVisible, setIsVisible] = useState(false); // Menyimpan apakah History ditampilkan atau tidak

    // Fungsi untuk toggle visibility (menyembunyikan atau menampilkan History)
    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Membalikkan nilai dari isVisible
    };
    return (
        <div id='top' className="container mx-auto p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Crypto Portfolio</h1>
            </header>

            <div className="portfolio-summary mb-6 flex justify-between px-14">
                <div className=' w-[270px]'>

                    <h2 className="text-xl text-gray-500">In Idr :
                        <span className="text-green-600"> Rp. {idr.toLocaleString('id-ID')}</span>
                        {/* <span className="text-green-600">Rp. {(depo-(Number(wd)+wdManual)).toLocaleString('id-ID')}</span> */}
                    </h2>
                    <h2 className="text-xl text-gray-500">In Order Sell :
                        <span className="text-green-600"> Rp. {Number(frozenSell.toFixed(0)).toLocaleString('id-ID')}</span>
                    </h2>
                    <h2 className="text-xl text-gray-500">in Order Buy :
                        <span className="text-green-600"> Rp. {Number(frozenBuy.toFixed(0)).toLocaleString('id-ID')}</span>

                    </h2>
                </div>
                <div className='flex flex-col'>
                    <h2 className="  w-[270px] text-2xl text-center font-semibold text-gray-700">Estimated Asset Value :<br />

                        <span className="text-green-600"> Rp. {Number((Number(idr) + Number(frozenBuy) + Number(estimasiValue)).toFixed(2)).toLocaleString('id-ID')}</span>
                        {/* <span className="text-green-600">Rp. {(depo-(Number(wd)+wdManual)).toLocaleString('id-ID')}</span> */}

                    </h2>
                    <button type="button" className="flex flex-col items-center space-x-2">
                        <h2 className="text-2xl text-gray-500">Profit/Loss:<br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {persen}%
                            </span><br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {(estimasiValue - sisaIdr).toLocaleString('id-ID')}
                            </span>
                        </h2>
                        {/* <p>Total Sell {totalSell}</p> */}
                        <h2 className="text-xl text-gray-500">Total Sell :
                            <span className="text-green-600"> {totalSell}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">Total Profit :
                            <span className="text-green-600"> Rp. {Number(allCoinProfitIdr.toFixed(0)).toLocaleString('id-ID')}</span>
                        </h2>
                    </button>
                </div>

                <div className=' w-[270px]'>
                    <button type="button" className="flex flex-col items-center space-x-2">

                        <h2 className="text-xl text-gray-500">Balance :
                            <span className="text-green-600"> Rp. {(sisaIdr).toLocaleString('id-ID')}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">Deposite :
                            <span className="text-green-600"> Rp. {(totalDepo).toLocaleString('id-ID')}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">withdrawal :
                            <span className="text-green-600"> Rp. {Number(totalWd).toLocaleString('id-ID')}</span>
                        </h2>
                    </button>
                </div>
            </div>
            <div className='flex justify-center flex-col'>
                {/* Tombol untuk toggle visibility */}

                <p
                    className="text-blue-600 font-bold px-4 py-2 rounded mb-4 text-center text-5xl"
                >
                    {isVisible ? 'History Trade' : 'Dashboard Page'}
                </p>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'DashBoard Pages' : 'History Trade'}
                </button>

                {/* Kondisional rendering untuk menampilkan History */}
                {isVisible ? <History dataBal={updatedBalances} history={history} idr={idr} /> : <TableDashboard dataBal={updatedBalances} history={history} idr={idr} dataWithCalc={dataDataWithCalc} />}
            </div>
        </div>
    );
};

export default Portfolio;
