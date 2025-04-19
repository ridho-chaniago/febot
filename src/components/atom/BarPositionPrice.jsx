import React from 'react'

function BarPositionPrice({ history, pair, last }) {
    const base = pair.split('_')[0];
    const minPrice = history.find(item => item.id === base && item.statusBuy == 'pending');
    const min = minPrice ? minPrice.buyPrice : 0;
    const maxPrice = history.filter(item => item.pair === pair && item.statusSell !== 'done');
    const max = maxPrice.map(item => Number(item.sellPrice));
    const maxSellPrice =Math.max(...max)
    const filteredBars = history
        .filter(item => item.id == base && Number(item.sellPrice))
        .map(item => {
            let color = '';
            if (item.status == 'filled') color = 'bg-green-500';
            if (item.statusSell !== 'done') color = 'bg-red-500';
            return { ...item, color };
        })
        .sort((a, b) => a.price - b.price);
    return (
        <tr className=''>
            <td colSpan={9} className='space-y-2 '>
                <div className="relative flex h-4 w-full bg-black rounded-full mt-1 mb-3 ">

                    <div
                        className="absolute top-0 h-4 w-4 bg-green-500 rounded-full -translate-x-1/2"
                        style={{ left: `${((min - min) / (maxSellPrice - min)) * 100}%` }}
                        title={`Buy: ${min}`}
                    ></div>
                    <div
                        className="absolute top-0 h-4 w-4 bg-blue-500 rounded-full -translate-x-1/2"
                        style={{ left: `${((Number(last) - min) / (maxSellPrice - min)) * 100}%` }}
                        title={`Buy: ${last} ${maxSellPrice}`}
                    ></div>
                    {max.map((item, index) => (
                        <div
                            key={index}
                            className="absolute top-0 h-4 w-4 bg-red-500 rounded-full -translate-x-1/2"
                            style={{
                                left: min !== maxSellPrice ? `${((item - min) / (maxSellPrice - min)) * 100}%` : '0%',
                                display: item > 0 ? 'block' : 'none',
                            }}
                            title={`Now: ${item}`}
                        ></div>
                    ))}

                    {/* <div
                        className="absolute top-0 h-4 w-4 bg-red-500 rounded-full -translate-x-1/2"
                        style={{ left: `${((maxSellPrice - min) / (maxSellPrice - min)) * 100}%` }}
                        title={`Now: ${maxSellPrice}`}
                    ></div> */}
                </div>

            </td>
        </tr>
    )
}

export default BarPositionPrice