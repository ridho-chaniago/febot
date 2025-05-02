import { useSelector, useDispatch } from 'react-redux';

function ProfitReport2() {
    const profitByDateArray= useSelector(state => state.dataProfit);
    const totalProfit = profitByDateArray.reduce((total, item) => total + item.profit, 0);
console.log(profitByDateArray)
    return (
        <div className="overflow-x-auto">
            <p className="text-xl font-bold text-center mt-4">
                Total Profit: <span className={totalProfit >= 0 ? "text-green-600" : "text-red-600"}>
                    {totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
            </p>

            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Profit</th>
                        <th className="px-4 py-2">Total Sell</th>
                        {/* <th className="px-4 py-2">Total Buy</th> */}
                        
                    </tr>
                </thead>
                <tbody>
                    {profitByDateArray.map((item, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2">{item.date}</td>
                            <td className="px-4 py-2">{item.profit.toLocaleString()}</td>
                            <td className="px-4 py-2">{item.totalSell}</td>
                            {/* <td className="px-4 py-2">{item.totalSell}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfitReport2
