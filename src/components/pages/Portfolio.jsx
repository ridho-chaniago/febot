import React, { useState, useEffect, use } from 'react';
import TableDashboard from '../molecules/TableDashboard';
import BotTimer from '../atom/botTimer';
import ProfitReport from './ProfitReport';
import { useDispatch, useSelector } from 'react-redux';
import TableHistory from '../molecules/TableHistory';
import Button from '../atom/Button';
const Portfolio = () => {
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    const dataProfit=useSelector(state=>state.dataProfit)
    const idr = dataCoin[0].idr
    const totalWd = 0
    const totalDepo = 3000171+4000796
    const sisaIdr = totalDepo - totalWd
    const asetCoinInIdr = Number(idr)
    const [tampilkanSaldo, setTampilkanSaldo] = useState(false);
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

    const frozenSell = dataDataWithCalc ? dataDataWithCalc.reduce((sum, item) => sum + item.balanceSell * item.last, 0)
        : 0;
    const sisaCoinAktif = dataDataWithCalc.reduce((sum, item) => sum + (Number(item.balance) * Number(item.buy)), 0)
    console.log("idr di koin aktif",sisaCoinAktif)
    const koinAktif= dataDataWithCalc.filter(item=>item.balance>0).map(item=>({coin:item.coin,balance:item.balance,totalIdr:Math.floor(Number(item.balance)*Number(item.buy))})).sort((a, b) => b.totalIdr - a.totalIdr);
    console.log(koinAktif)
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

    const estimasiValue = (asetCoinInIdr + frozenSell + frozenBuy + allCoinProfitIdr + sisaCoinAktif)
    const persen = (((estimasiValue - totalDepo) / totalDepo) * 100).toFixed(2)
    const [activePage, setActivePage] = useState("dashboard");

    function handlePageChange(page) {
        setActivePage(page);
    }


    return (
        <div id='top' className="container mx-auto p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Crypto Portfolio</h1>
            </header>

            <div className="portfolio-summary mb-6 flex justify-between px-14">
                <div className=' w-[270px]'>

                    <h2 className="text-xl text-gray-500">In Idr :
                        <span className="text-green-600"> Rp. {tampilkanSaldo ? (dataCoin[0].idr).toLocaleString('id-ID') : "********"}</span>
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
                        <h2 className="text-xl text-gray-500">Total Sell :
                            <span className="text-green-600"> {totalSellLength}</span>
                        </h2>
                        <h2 className="text-xl text-gray-500">Total Profit :
                            <span className="text-green-600"> Rp. {Number(totalProfit.toFixed(0)).toLocaleString('id-ID')}</span>
                        </h2>
                    </button>
                    <BotTimer />
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
            <div className="flex flex-col items-center justify-center">


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



                {activePage === "dashboard" && <TableDashboard dataWithCalc={dataDataWithCalc} />}
                {activePage === "history" && <TableHistory />}
                {activePage === "profit" && <ProfitReport />}


            </div>
        </div>
    );
};

export default Portfolio;
