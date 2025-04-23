import React from 'react'
import Table from '../atom/Table'
import BarPositionPrice from '../atom/BarPositionPrice'

function TableDashboard({ dataBal, history, idr ,dataWithCalc}) {
    
    const sortedData = dataWithCalc.sort((a, b) => b.totalIdr - a.totalIdr);
    const profitOneDay=history.filter(item => item.statusSell === "done" && new Date(item.timeSell).toISOString().split("T")[0]===new Date().toISOString().split("T")[0]).reduce((sum, item) => sum + (Number(item.amountSell) * Number(item.sellPrice)) - (Number(item.buyAmount) * Number(item.buyPrice)), 0);
    const sellOneDay=history.filter(item => item.statusSell === "done" && new Date(item.timeSell).toISOString().split("T")[0]===new Date().toISOString().split("T")[0]).length
    console.log(sellOneDay)
    console.log(profitOneDay)
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
                        <th className="px-4 py-2 text-left font-medium bg-green-400 text-white">Total Sell {sellOneDay}</th>
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
                                history={history}
                            />
                            <BarPositionPrice last={item.last} pair={item.pair} history={history} />
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default TableDashboard