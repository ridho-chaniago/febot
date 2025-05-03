import React, { useState, useEffect, use } from 'react';
import TableDashboard from '../molecules/TableDashboard';
import BotTimer from '../atom/botTimer';
import ProfitReport from './ProfitReport';
import { useDispatch, useSelector } from 'react-redux';
import { deposite } from '../../config/config';
import TableHistory from '../molecules/TableHistory';
import Button from '../atom/Button';
import TableHistory2 from '../molecules/TableHistory2';
import ProfitReport2 from './ProfitReport2';
import TableDashboard2 from '../molecules/TableDashBoard2';

const Portfolio2 = ({ idrHold }) => {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const dataProfit = useSelector(state => state.dataProfit)
    const idr = dataCoin[0].idr
    const totalWd = 0
    // const totalDepo = 3000171+4000796
    const totalDepo = deposite.depo
    const sisaIdr = totalDepo - totalWd
    const asetCoinInIdr = Number(idr)
    const [tampilkanSaldo, setTampilkanSaldo] = useState(true);
    const totalSell = dataHistory.filter(item => item.statusSell === "done").length;
    const allCoinProfitIdr = dataHistory
        .filter(item => item.statusSell === "done")
        .reduce((sum, item) => sum + (Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice)), 0);
    const dataDataWithCalc = dataCoin.map(item => {
        const base = item.pair.split('_')[0];
        const coin = dataHistory.filter(h => h.id === base && h.statusBuy == "pending" && !h.statusSell);
        const coinBalance = dataHistory.filter(h => h.id === base && h.statusSell !== 'done' && h.statusBuy === 'filled');
        const balanceSell = coinBalance.reduce((sum, h) => sum + Number(h.buyAmount), 0);
        const balanceBuy = coin.reduce((sum, h) => sum + Number(h.buyAmount), 0);

        const totalIdr = coinBalance.reduce((sum, h) => sum + Number(h.amountSell) * Number(item.last), 0);
        const coinAvg = dataHistory.filter(h => h.id === base && h.statusBuy == 'filled' && h.statusSell == 'pending');

        const avgBuy = coinAvg.length > 0 ? coinAvg.reduce((sum, h) => sum + Number(h.buyPrice), 0) / coinAvg.length : 0;

        const sellComplete = dataHistory.filter(h => h.id === base && h.statusSell === "done");
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
    const totalSellLength = dataProfit.reduce((sum, item) => sum + Number(item.totalSell), 0);
    const totalProfit = dataProfit.reduce((sum, item) => sum + Number(item.profit), 0);



    // console.log(dataDataWithCalc)
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
    // ESTIMASI ASSET VALUE 
    const frozenSell = dataDataWithCalc ? dataDataWithCalc.reduce((sum, item) => sum + item.hold * item.last, 0) : 0;
    const sisaCoinAktif = dataDataWithCalc.reduce((sum, item) => sum + (Number(item.balance) * Number(item.buy)), 0)
    const koinAktif = dataDataWithCalc.filter(item => item.balance > 0).map(item => ({ coin: item.coin, balance: item.balance, totalIdr: Math.floor(Number(item.balance) * Number(item.buy)) })).sort((a, b) => b.totalIdr - a.totalIdr);
    const estimasiValue = Number(idrHold) + Number(frozenSell) + Number(sisaCoinAktif) + idr
    // const estimasiValue = (asetCoinInIdr + frozenSell + frozenBuy + allCoinProfitIdr + sisaCoinAktif)
    const persen = (((estimasiValue - totalDepo) / totalDepo) * 100).toFixed(2)
    const [activePage, setActivePage] = useState("dashboard");

    function handlePageChange(page) {
        setActivePage(page);
    }


    return (
        <div id='top' className="container mx-auto py-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Crypto Portfolio</h1>
            </header>

            <div className="portfolio-summary mb-2 flex flex-col justify-center items-center">
                <div className='flex flex-col justify-center items-center'>
                    <div className="  w-[270px] text-xl text-center font-semibold mb-3 text-gray-700">Estimated Asset Value :<br />
                        <div className='flex items-center justify-center'>
                            <button
                                onClick={() => setTampilkanSaldo(!tampilkanSaldo)}
                                className="bg-gray-200  text-black mr-2 px-3 py-1 border hover:bg-gray-300 rounded shadow-md hover:shadow-lg active:translate-y-[1px] active:shadow-sm transition-all"
                            >
                                {tampilkanSaldo ? "🙈" : "👀"}
                            </button>
                            <span className="text-green-600"> Rp. {tampilkanSaldo ? Number(estimasiValue.toFixed(0)).toLocaleString('id-ID') : "********"}</span>
                        </div>
                        <p className={`text-sm text-gray-500`}>
                            Deposite: Rp. {Number(totalDepo.toFixed(0)).toLocaleString('id-ID')}
                        </p>
                        <span className={`text-sm ${persen >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Profit: {persen}% ( <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {Number((estimasiValue - sisaIdr).toFixed(0)).toLocaleString('id-ID')}
                            </span> )
                        </span>
                    </div>
                </div>
                <div className=' w-[270px] flex justify-around'>

                    <h2 className="text-xs text-gray-500">In Idr :<br />
                        <span className="text-green-600"> Rp. {tampilkanSaldo ? (dataCoin[0].idr).toLocaleString('id-ID') : "********"}</span>
                        {/* <span className="text-green-600">Rp. {(depo-(Number(wd)+wdManual)).toLocaleString('id-ID')}</span> */}
                    </h2>
                    <h2 className="text-xs text-gray-500">idr Hold :<br />
                        <span className="text-green-600"> Rp. {(Number(idrHold.toFixed(0))).toLocaleString('id-ID')}</span>

                    </h2>
                    <h2 className="text-xs text-gray-500">In Order Sell :<br />
                        <span className="text-green-600"> Rp. {Number(frozenSell.toFixed(0)).toLocaleString('id-ID')}</span>
                    </h2>
                </div>
                <div className="relative group w-fit">
                    <button className="text-xs text-gray-500 mt-2">
                        In Coin Active:
                        <span className="text-green-600"> Rp. {Number(sisaCoinAktif.toFixed(0)).toLocaleString('id-ID')}</span>
                    </button>

                    {/* Tooltip muncul saat hover */}
                    <div className="absolute bottom-full mb-1 left-0 bg-black text-white text-[10px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Idr dalam koin yg belum dijual oleh bot
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center overflow-x-auto">

                <button type="button" className=" flex bg-gray-100 mb-2 p-2 rounded-lg border flex-col items-center space-x-2">


                    <BotTimer />
                    <h2 className="text-xs  text-gray-500">Total Sell :
                        <span className="text-green-600"> {totalSellLength}</span>
                    </h2>
                    <h2 className="text-xs text-gray-500">Total Profit :
                        <span className="text-green-600"> Rp. {Number(totalProfit.toFixed(0)).toLocaleString('id-ID')}</span>
                    </h2>
                </button>
                <div className="flex space-x-2">
                    <Button
                        onClick={() => handlePageChange("dashboard")}
                        isActive={activePage === "dashboard"}>
                        Dashboard
                    </Button>
                    <Button
                        onClick={() => handlePageChange("history")}
                        isActive={activePage === "history"}>
                        History
                    </Button>
                    <Button
                        onClick={() => handlePageChange("profit")}
                        isActive={activePage === "profit"}>
                        Profit
                    </Button>
                </div>
            </div>



            {activePage === "dashboard" && <TableDashboard2 dataWithCalc={dataDataWithCalc} />}
            {activePage === "history" && <TableHistory2 />}
            {activePage === "profit" && <ProfitReport2 />}


        </div>
    );
};

export default Portfolio2;
