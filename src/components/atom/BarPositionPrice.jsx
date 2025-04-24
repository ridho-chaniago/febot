import React from 'react'

function BarPositionPrice({ history, pair, last }) {
    const base = pair.split('_')[0];
    const minPrice = history.find(item => item.id === base && item.statusBuy == 'pending');
    const min = minPrice ? minPrice.buyPrice : 0;
    const maxPrice = history.filter(item => item.pair === pair && item.statusSell !== 'done');
    // const max = maxPrice.map(item => Number(item.sellPrice)).sort((a, b) => a - b);
    const max = maxPrice
        .map(item => ({
            ...item,
            sellPrice: Number(item.sellPrice) // biar bisa dibandingkan sebagai angka
        }))
        .sort((a, b) => a.sellPrice - b.sellPrice);
    const maxSellPrice = Math.max(...max)
    return (
        <tr className=''>
            <td colSpan={9} className='space-x-2 '>
                <div className="flex h-6 w-full bg-gray-400 rounded-lg p  mb-3 ">


                    <div
                        className="relative group text-white h-6 w-12 bg-green-500 rounded-lg flex flex-col items-center justify-center" >
                        <div className="w-1 -full"></div>
                        <p className="text-xs ">{
                            `${(min !== maxSellPrice ? ((min - last) / (last)) * 100 : 0).toFixed(2)}%`
                        }</p>
                        <div className="absolute bottom-full bg-green-500 text-white text-sm px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                            {/* Rp.{"123456.2345423".toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} */}
                            {/* Rp.{min.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} */}
                            Rp.{(Number(min) || 0).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}


                        </div>
                    </div>

                    <div className="relative group  hover:bg-blue-700  cursor-pointer text-white h-6 w-12 bg-blue-500 rounded-lg flex flex-col justify-center items-center" >

                        <p className="text-xs ">{`0%`
                        }</p>
                        <div className="absolute bottom-full bg-blue-600 text-white text-sm px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                            Rp.{(Number(last) || 0).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                    {max.map((item, index) => (

                        <div
                            key={index}
                            className="relative group text-white h-6 w-12 bg-red-500 hover:bg-red-700  cursor-pointer rounded-lg flex flex-co justify-center items-center" >
                            <p className=" text-xs ">{
                                `${(min !== maxSellPrice ? ((item.sellPrice - last) / (last)) * 100 : 0).toFixed(2)}%`
                            }</p>
                            <div className="absolute top-full z-10 bg-red-600 text-white text-sm px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">

                            
                                    <p>id : {item.idBuy}</p>
                                    <p>price : Rp.{Number(item.sellPrice || 0).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                                    <p>Amount Buy : {item.buyAmount}</p>
                                    <p>Amount Sell : {item.amountSell}</p>
                                    <p>Total Idr : Rp.{(Number(item.amountSell) * Number(last)).toLocaleString('id-ID')}</p>


                            </div>
                        </div>
                    ))}
                </div>

            </td>
        </tr>
    )
}

export default BarPositionPrice