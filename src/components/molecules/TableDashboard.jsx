import React from 'react'
import Table from '../atom/Table'
import BarPositionPrice from '../atom/BarPositionPrice'
import { useDispatch, useSelector } from 'react-redux';

function TableDashboard({ dataBal, idr, dataWithCalc }) {
    
    const dataCoin = useSelector(state => state.dataCoin);
    const dataHistory = useSelector(state => state.dataHistory);
    function formatFinish_time(timestampInSeconds) {
        const jakartaOffset = 7 * 60 * 60 * 1000; // +7 jam dalam ms
        const date = new Date(Number(timestampInSeconds) * 1000); // ubah ke ms
        const jakartaTime = new Date(date.getTime() + jakartaOffset);
        return jakartaTime.toISOString().split("T")[0]; // yyyy-mm-dd
    }
    

    const getTodayJakarta = () => {
        const now = new Date();
        // Konversi ke zona waktu Asia/Jakarta manual dengan offset +7 jam (dalam ms)
        const jakartaOffset = 7 * 60 * 60 * 1000;
        const jakartaTime = new Date(now.getTime() + jakartaOffset);
        return jakartaTime.toISOString().split("T")[0]; // hasilnya yyyy-mm-dd
        // return jakartaTime
    };
    // console.log("today ", getTodayJakarta())
    const dateHistory = dataHistory.filter(item => item.finish_time).map(item=>({...item,finish_time:formatFinish_time(Number(item.finish_time))}))
    const sortedData = dataWithCalc.sort((a, b) => b.totalIdr - a.totalIdr);
    const profitOneDay = dateHistory.filter(item => item.statusSell === "done" && item.finish_time === getTodayJakarta()).reduce((sum, item) => sum + (Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice)), 0);
    const sellOneDay = dateHistory.filter(item => item.statusSell === "done" && item.finish_time === getTodayJakarta()).length
    // console.log('date dataHistory', dateHistory)
    // console.log("sell one day", sellOneDay)
    // console.log("profit one day", profitOneDay)
    return (
        <div className="p-2 flex flex-col justify-center items-center">

            <table className="min-w-full table-auto">
                <thead className='bg-blue-200 sticky top-16 min-w-full shadow-lg z-10'>
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">No</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Coin</th>
                        <th className="px-4 py-2 text-center font-medium text-gray-600">Change %</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Balance</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Avg Buy</th>
                        <th className="pl-14 py-2 text-left font-medium text-gray-600">Last Price</th>
                        <th className="px-6 py-2 text-left font-medium text-gray-600">IDR</th>
                        <th className="px-4 py-2 text-left font-medium bg-green-400 text-white">Sell Today {sellOneDay}</th>
                        <th className="px-4 py-2 font-medium bg-red-400 text-white text-center">
                            Profit Today<br />
                            <b>Rp. {(Math.floor(profitOneDay)).toLocaleString('id-ID')}</b>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sortedData.map((item, index) => (
                        <>
                            <Table
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
                            <BarPositionPrice last={item.last} pair={item.pair} dataHistory={dataHistory} />
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default TableDashboard