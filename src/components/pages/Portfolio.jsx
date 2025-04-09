import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from '../organisms/history';
const Portfolio = ({ total, idr }) => {
    const [depo, setDepo] = useState([]);
    const [wd, setWd] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);

    useEffect(() => {
        fetchAssets();
    }, []);

    // Mengambil data harga kripto dari API
    const fetchAssets = async () => {
        try {
            const response = await axios.get(
                'https://bot.serveo.net/saldo'
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
    
    const persen = ((((total+idr) - depo).toFixed(2)) / total * 100).toFixed(2)
    const [isVisible, setIsVisible] = useState(false); // Menyimpan apakah History ditampilkan atau tidak

    // Fungsi untuk toggle visibility (menyembunyikan atau menampilkan History)
    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Membalikkan nilai dari isVisible
    };
    return (
        <div id='top' className="container mx-auto p-6">
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
                <h2 className="text-2xl text-center font-semibold text-gray-700">Estimated Asset Value :<br />
                    <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {Math.round(total+idr)}</span>
                </h2>
                <div>
                    <button type="button" onClick={fetchAssets} className="flex items-center space-x-2">
                        <h2 className="text-2xl text-gray-500">Profit/Loss:<br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {persen}%
                            </span><br />
                            <span className={persen >= 0 ? 'text-green-600' : 'text-red-600'}>Rp. {((total+idr) - depo).toFixed(2)}</span>
                        </h2>


                    </button>

                </div>
            </div>
            <div className='flex justify-center flex-col'>
                {/* Tombol untuk toggle visibility */}
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'Sembunyikan Riwayat' : 'Tampilkan Riwayat'}
                </button>

                {/* Kondisional rendering untuk menampilkan History */}
                {isVisible && <History />}
            </div>
        </div>
    );
};

export default Portfolio;
