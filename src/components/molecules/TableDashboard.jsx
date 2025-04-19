import React from 'react'
import Table from '../atom/Table'
import BarPositionPrice from '../atom/BarPositionPrice'

function TableDashboard({ dataBal, history, idr}) {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center ">

            <h1 id='top' className="text-3xl px-10 font-semibold text-center mb-6 text-gray-800">You need Deposite {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(11000)}</h1>
            <table className="min-w-full table-auto">
                <thead className='bg-blue-200 sticky top-16 min-w-full shadow-lg z-10'>
                    <tr className="bg-blue-200 ">
                        <th className="px-4 py-2 text-left font-medium text-gray-600">No</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Coin</th>
                        <th className="px-4 py-2  text-center font-medium text-gray-600">Change %</th>
                        <th className="pl-14 py-2 text-left font-medium text-gray-600">Ket</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Balance</th>
                        <th className="px-6 py-2 text-left font-medium text-gray-600">IDR</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Avg Buy</th>
                        <th className="px-4 py-2 text-left font-medium bg-green-400 text-gray-600">Market Buy</th>
                        <th className="px-4 py-2 text-left font-medium bg-red-400 text-gray-600">Market Sell</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {dataBal.map((item, index) => (
                        // <Table negatif={totalNegativePercent} pair={item.pair} avg={item.avg} sell={item.sell} buy={item.buy} balance={item.balance} idr={idr} i={index + 1} />
                        <>
                            <Table pair={item.pair} avg={item.avg} sell={item.sell} buy={item.buy} balance={item.balance} idr={idr} i={index + 1} />
                            <BarPositionPrice last={item.last} pair={item.pair} history={history} />
                        </>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard