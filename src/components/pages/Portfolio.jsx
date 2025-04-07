import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Portfolio = ({ total }) => {
    const [depo, setDepo] = useState([]);
    const [wd, setWd] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [profitLoss, setProfitLoss] = useState(0);

    // Contoh data portfolio
    const portfolio = [
        { name: 'Bitcoin', symbol: 'BTC', amount: 0.5 },
        { name: 'Ethereum', symbol: 'ETH', amount: 2 },
        { name: 'Binance Coin', symbol: 'BNB', amount: 10 },
    ];
    // const updatedBalances=Dashboard.updatedBalances
    useEffect(() => {
        fetchAssets();
    }, []);

    // Mengambil data harga kripto dari API
    const fetchAssets = async () => {
        try {
            const response = await axios.get(
                'https:/bot.serveo.net/saldo'
            );
            setWd(response.data.withdraw.idr);
            const dataDepo = response.data.deposit.idr
            setDepo(dataDepo.reduce((sum, item) => sum + parseInt(item.amount), 0))
            // calculatePortfolioValue(response);
            console.log(depo);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Menghitung total nilai portfolio dan profit/loss
    // const calculatePortfolioValue = (data) => {
    //     let totalValue = 0;
    //     let totalInitialValue = 0;

    //     portfolio.forEach((asset) => {
    //         const currentPrice = data[asset.symbol.toLowerCase()]?.usd || 0;
    //         totalValue += currentPrice * asset.amount;
    //         totalInitialValue += 1000 * asset.amount; // Misalkan pembelian awal 1000 USD untuk setiap aset
    //     });

    //     setPortfolioValue(totalValue);
    //     setProfitLoss(totalValue - totalInitialValue);
    // };
    const persen = (((total - depo).toFixed(2)) / total * 100).toFixed(2)
    // setProfitLoss(persen)
    // console.log(profitLoss)
    return (
        <div className="container mx-auto p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Crypto Portfolio</h1>
            </header>

            <div className="portfolio-summary mb-6 flex justify-between px-14">
                <div>
                    <h2 className="text-2xl text-gray-500">Deposite :
                        <span className="text-green-600">Rp. {depo}</span>
                    </h2>
                    <h2 className="text-2xl text-gray-500">Withdraw:
                        <span className="text-green-600">Rp. {portfolioValue.toFixed(2)}</span>
                    </h2>
                </div>
                <h2 className="text-2xl text-center font-semibold text-gray-700">Estimated Asset Value :<br/>
                    <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {(total).toFixed(2)}</span>
                </h2>
                <div>
                    <button type="button" onClick={fetchAssets} className="flex items-center space-x-2">
                        <h2 className="text-2xl text-gray-500">Profit/Loss:<br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {persen}%
                            </span><br/>
                    <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {(total - depo).toFixed(2)}</span>
                        </h2>
                       

                    </button>

                </div>
            </div>

            {/* <div className="asset-list mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">History Trade</h2>
                <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                            <th className="px-4 py-2 text-left text-gray-600">Current Price (USD)</th>
                            <th className="px-4 py-2 text-left text-gray-600">Total Value (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((asset) => (
                            <tr key={asset.symbol} className="border-b">
                                <td className="px-4 py-2">{asset.name}</td>
                                <td className="px-4 py-2">{asset.amount}</td>
                                <td className="px-4 py-2">{assets[asset.symbol.toLowerCase()]?.usd || 'Loading...'}</td>
                                <td className="px-4 py-2">{(assets[asset.symbol.toLowerCase()]?.usd || 0) * asset.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default Portfolio;
