import React from 'react'
import Table from '../atom/Table'

function TableDashboard({ sortedBalances, totalNegativePercent, idr }) {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            <h1 id='top' className="text-3xl px-10 font-semibold text-center mb-6 text-gray-800">You need Deposite {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalNegativePercent * 11000)}</h1>
            <table className="min-w-full bg-white table-auto border border-black rounded">
                <thead className='sticky top-16 w-full '>
                    <tr className="bg-blue-200">
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
                    {sortedBalances.map((allBalance, index) => (
                        <Table negatif={totalNegativePercent} pair={allBalance.pair} avg={allBalance.avg} sell={allBalance.sell} buy={allBalance.buy} balance={allBalance.balance} idr={idr} i={index + 1} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard