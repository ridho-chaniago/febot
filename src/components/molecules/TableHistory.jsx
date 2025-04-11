import React from 'react'

function TableHistory({history}) {
  return (
    <div><table className="min-w-full bg-white table-auto border border-black rounded">
    <thead className="sticky top-16 w-full">
        <tr className="bg-blue-200">
            <th className="px-4 py-2 text-left font-medium text-gray-600">No</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Coin</th>
            <th className="px-10 py-2 text-left font-medium text-gray-600">Price</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Amount</th>
            <th className="px-6 py-2 text-left font-medium text-gray-600">IDR</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Time</th>
        </tr>
    </thead>
    <tbody className="bg-gray-100">
        {history.map((item, index) => (
            <tr key={index} className=" hover:bg-gray-100 border-b-black">
                <td className={`px-6 py-2 bg-gray-200`}>{index + 1}</td>
                <td className={`px-6 py-2`}>{item.pair}</td>
                <td className={`px-6 py-2`}>
                    {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,  // Menghilangkan angka di belakang koma
                        maximumFractionDigits: 0   // Menghilangkan angka di belakang koma
                    }).format(item.amountInIDR / item.amountInCoin)}
                </td>
                <td className={`px-4 py-2`}>{(item.amountInCoin.toFixed(5))}</td>
                <td className={`px-6 py-2`}>
                    {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,  // Menghilangkan angka di belakang koma
                        maximumFractionDigits: 0   // Menghilangkan angka di belakang koma
                    }).format(item.amountInIDR)}
                </td>
                <td className={`px-6 py-2`}>{(item.date).split(',')[1].trim()}</td>
            </tr>
        ))}
    </tbody>
</table> </div>
  )
}

export default TableHistory