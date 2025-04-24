import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import History from '../organisms/History';
import TableDashboard from '../molecules/TableDashboard';
const Portfolio = ({ idr, updatedBalances, history }) => {
    const [dataBal, setDataBal] = useState([]);
    const [inOrderSell, setInOrderSell] = useState(0)
    const [inOrderBuy, setInOrderBuy] = useState(0)
    const totalWd = 0
    const totalDepo = 3000171
    const sisaIdr = totalDepo - totalWd
    const asetCoinInIdr = Number(idr)
    const [tampilkanSaldo, setTampilkanSaldo] = useState(false);


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

        const totalIdr = coinBalance.reduce((sum, h) => sum + Number(h.amountSell) * Number(item.last), 0);
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

    const estimasiValue = (asetCoinInIdr + frozenSell + frozenBuy+allCoinProfitIdr)
    console.log(estimasiValue, asetCoinInIdr, frozenBuy, frozenSell)
    const persen = (((estimasiValue - totalDepo) / totalDepo) * 100).toFixed(2)
    const [isVisible, setIsVisible] = useState(false); // Menyimpan apakah History ditampilkan atau tidak
    console.log(estimasiValue, sisaIdr)
    console.log("asetCoinIndr", asetCoinInIdr)
    console.log("frozeSell", inOrderSell)
    console.log("frozenBuy", frozenBuy)
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
                        <span className="text-green-600"> Rp. {tampilkanSaldo ? idr.toLocaleString('id-ID') : "********"}</span>
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
                        <div className='flex items-center'>
                            <button
                                onClick={() => setTampilkanSaldo(!tampilkanSaldo)}
                                className="bg-gray-200 text-black mr-2 px-3 py-1 border hover:bg-gray-300 rounded shadow-md hover:shadow-lg active:translate-y-[1px] active:shadow-sm transition-all"

                            >
                                {tampilkanSaldo ? "🙈" : "👀"}
                            </button>
                            <span className="text-green-600"> Rp. {tampilkanSaldo ? Number(estimasiValue.toFixed(0)).toLocaleString('id-ID') : "********"}</span>
                        </div>
                    </h2>


                    <button type="button" className="flex flex-col items-center space-x-2">
                        <h2 className="text-2xl text-gray-500">Profit/Loss:<br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {persen}%
                            </span><br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {Number((estimasiValue - sisaIdr).toFixed(0)).toLocaleString('id-ID')}
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
                            <span className="text-green-600"> Rp. {tampilkanSaldo ? (sisaIdr).toLocaleString('id-ID') : "********"}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">Deposite :
                            {/* <span className="text-green-600"> Rp. {(totalDepo).toLocaleString('id-ID')}</span> */}
                            <span className="text-green-600"> Rp. {tampilkanSaldo ? (totalDepo).toLocaleString('id-ID') : "********"}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">withdrawal :
                            <span className="text-green-600"> Rp. {Number(totalWd).toLocaleString('id-ID')}</span>
                            {/* <span className="text-green-600"> Rp. {Number(totalWd).toLocaleString('id-ID')}</span> */}
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
