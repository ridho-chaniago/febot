import React from 'react'
import Table from '../atom/Table'
import BarPositionPrice from '../atom/BarPositionPrice'
import { useDispatch, useSelector } from 'react-redux';
import Table2 from '../atom/Table2';
import BarPositionPrice2 from '../atom/BarPositionPrice2';

function TableDashboard2({ dataBal, idr, dataWithCalc }) {
    const profitByDateArray = useSelector(state => state.dataProfit);
    const profitOneDay = profitByDateArray.reduce((total, item) => total + item.profit, 0);
    // console.log("profiteOndeDat",profitByDateArray[0].profit)
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    function formatFinish_time(timestampInSeconds) {
        const jakartaOffset = 7 * 60 * 60 * 1000; // +7 jam dalam ms
        const date = new Date(Number(timestampInSeconds) * 1000); // ubah ke ms
        const jakartaTime = new Date(date.getTime() + jakartaOffset);
        return jakartaTime.toISOString().split("T")[0]; // yyyy-mm-dd
    }


    const getTodayJakarta = () => {
        const date = new Date();
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Jakarta' // ⬅️ WIB
        }).format(date).replace(/:/g, '.'); // ⬅️ titik pemisah waktu
    };

    function formatDate(timeBuy) {
        const date = new Date(timeBuy);
        const offsetDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        const formattedDate = offsetDate.toISOString().slice(0, 10);
        return formattedDate
    }

    // console.log("today ", getTodayJakarta())
    const dateHistory = dataHistory.filter(item => item.finish_time).map(item => ({ ...item, finish_time: formatFinish_time(Number(item.finish_time)) }))
    const sortedData = dataWithCalc.sort((a, b) => b.totalIdr - a.totalIdr);
    const sellOneDay = dataHistory.filter(item => item.statusSell === "done" && (item.timeSell).split(',')[0] == getTodayJakarta()).length
    const buyOneDay = dataHistory.filter(item => item.statusBuy === "filled" && (item.timeBuy).split(',')[0] == getTodayJakarta()).length
    const cancelOneDay = dataHistory.filter(item => item.statusSell === "cancelled")
    console.log(cancelOneDay)
    return (
        <div className="p-2 flex flex-col justify-center items-center">
            <div className='flex bg-gray-200'>
                <p className="px-4 py-2 text-center font-medium text-xs ">Buy Today <br />{buyOneDay}</p>
                <p className="px-4 py-2 text-center font-medium text-xs">Sell Today<br /> {sellOneDay}</p>
                <p className="px-4 py-2 font-medium bg-green-400 text-white text-xs text-center">
                    Profit Today<br />
                    <b>
                        {profitByDateArray.length > 0 && profitByDateArray[0].profit
                            ? `Rp. ${Math.floor(Number(profitByDateArray[0].profit) * 0.97888).toLocaleString('id-ID')}`
                            : 'Rp. -'}
                    </b>

                </p>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm table-auto">

                    {/* <thead className='bg-blue-200 sticky top-16 min-w-full shadow-lg z-10'> */}
                    <thead>
                        <tr className='bg-blue-200'>
                            <th className=" py-2 text-center text-xs font-medium text-gray-600">No</th>
                            <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">Coin</th>
                            <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">Change %</th>
                            <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">Avg Buy</th>
                            <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">Last Price</th>
                            <th className="px-1 py-2 text-center text-xs font-medium text-gray-600">IDR</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {sortedData.map((item, index) => (
                            <>

                                <Table2
                                    pair={item.pair}
                                    avg={item.avgBuy}
                                    sell={item.sell}
                                    buy={item.buy}
                                    balance={item.balanceSell}
                                    totalIdr={item.totalIdr}
                                    profitIdr={item.profitIdr}
                                    i={index + 1}
                                    last={item.last}
                                    sellCompleteLength={item.sellCompleteLength}
                                    dataHistory={dataHistory}
                                />
                                <BarPositionPrice2 last={item.last} pair={item.pair} dataHistory={dataHistory} />
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default TableDashboard2