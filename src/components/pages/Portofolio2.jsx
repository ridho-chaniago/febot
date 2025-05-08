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
import bgTool from '../../assets/img/bgTool.png';
import Logs from './logs';

console.log(bgTool)

const Portfolio2 = ({ idrHold }) => {
    const dataCoin = useSelector(state => state.dataCoin);
    const logoTol = <img src="../../assets/img/bgTool.jpg" alt="Tol Icon" width="32" />

    const dataHistory = useSelector(state => state.dataHistory);
    const dataProfit = useSelector(state => state.dataProfit)
    const idr = dataCoin[0].idr
    const totalWd = 0
    const totalDepo = deposite.depo
    const [tampilkanSaldo, setTampilkanSaldo] = useState(true);
    const dataDataWithCalc = dataCoin.map(item => {
        const base = item.pair.split('_')[0];
        const coin = dataHistory.filter(h => h.id === base && h.statusBuy == "pending" && !h.statusSell);
        const coinBalance = dataHistory.filter(h => h.id === base && h.statusSell !== 'done' && h.statusBuy === 'filled' && h.statusSell !== "cancelled");
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
    const totalProfit = dataProfit.reduce((sum, item) => sum + (Number(item.profit) * 0.97888), 0);



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
    const minus = dataHistory.filter(item => item.statusSell === "cancelled").reduce((sum, item) => sum + ((Number(item.amountCancel) * Number(item.priceCancel)) - (Number(item.buyAmount) * Number(item.buyPrice))), 0);
    const profitBotTimer = Number(((totalProfit) + minus).toFixed(0)).toLocaleString('id-ID')
    function handlePageChange(page) {
        setActivePage(page);
    }


    return (
        <div id='top' className="container mx-auto relative">

            <img src={bgTool} alt="Tol Icon" className="opacity-75 w-full absolute" />

            {/* <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 ">Project JALAN TOL 🛣️</h1>
            </header> */}

            <div className="portfolio-summary mb-2 flex flex-col justify-center items-center  ">
                {/* <div className='flex flex-col justify-center items-center'>
                    <div className="  w-[270px] text-xl text-center font-semibold mb-3 text-gray-700"> <br />
                        <div className='flex flex-col items-center justify-center'>
                            <button
                                onClick={() => setTampilkanSaldo(!tampilkanSaldo)}
                                className="bg-gray-200  text-black mr-2 px-3 py-1 border hover:bg-gray-300 rounded shadow-md hover:shadow-lg active:translate-y-[1px] active:shadow-sm transition-all"
                            >
                                {tampilkanSaldo ? "🙈" : "👀"}
                            </button>
                            <span className="text-green-600"> Rp. {tampilkanSaldo ? Number(estimasiValue.toFixed(0)).toLocaleString('id-ID') : "********"}</span>
                        </div>

                        <span className={`text-sm ${persen >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Profit: {persen}% ( <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {Number((estimasiValue - sisaIdr).toFixed(0)).toLocaleString('id-ID')}
                            </span> )
                        </span>
                    </div>
                </div> */}
                <div className=' w-[270px] flex justify-around gap-5 items-center pt-52 z-10'>


                    {/* <h2 className="text-xs text-gray-500">idr Hold :<br />
                        <span className="text-green-600"> Rp. {(Number(idrHold.toFixed(0))).toLocaleString('id-ID')}</span>

                        </h2> */}
                    {/* <h2 className="text-xs text-gray-500">In Order Sell :<br />
                            <span className="text-green-600"> Rp. {Number(frozenSell.toFixed(0)).toLocaleString('id-ID')}</span>
                        </h2> */}

                    {/* <div className="relative group w-fit">

                        <div className="absolute bottom-full mb-1 left-0 bg-black text-white text-[10px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Idr dalam koin yg belum dijual oleh bot
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center overflow-x-auto">
                <div type="button" className=" flex bg-gray-100 mb-2 p-2 rounded-lg border flex-col items-center space-x-2 z-10">
                    <BotTimer totalSellLength={totalSellLength} totalProfit={profitBotTimer} deposite={totalDepo} />
                    <p className="text-xs text-center text-gray-500">Total seluruh Kendaraan yang melewati jalan tol :<span className="text-green-600"> {totalSellLength}</span> kendaraan, dengan keuntungan <span className="text-green-600"> Rp. {Number(((totalProfit) + minus).toFixed(0)).toLocaleString('id-ID')} </span>
                    </p>
                    {/* <h2 className="text-xs text-gray-500">Idr Free :
                        <span className="text-green-600"> Rp. {tampilkanSaldo ? (dataCoin[0].idr).toLocaleString('id-ID') : "********"}</span>
                    </h2>
                    <button className="text-xs text-gray-500">
                        In Coin Active:
                        <span className="text-green-600"> Rp. {Number(sisaCoinAktif.toFixed(0)).toLocaleString('id-ID')}</span>
                    </button> */}
                </div>

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
                    <Button
                        onClick={() => handlePageChange("live")}
                        isActive={activePage === "live"}>
                        Live Bot
                    </Button>
                </div>
            </div>



            {activePage === "dashboard" && <TableDashboard2 dataWithCalc={dataDataWithCalc} />}
            {activePage === "history" && <TableHistory2 />}
            {activePage === "profit" && <ProfitReport2 minus={minus} />}
            {activePage === "live" && <Logs/>}


        </div>
    );
};

export default Portfolio2;
