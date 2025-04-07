import React from 'react';

const Card = ({ pair, avg, buy, sell, bal}) => {
  // Fungsi untuk menghitung persentase
  const calculatePercentage = (price, referencePrice) => {
    const diff = Math.abs(price - referencePrice);  // Selisih antara avg dan harga
    return ((diff / referencePrice) * 100).toFixed(2);  // Menghitung persentase dan membulatkan hingga 2 desimal
  };
console.log(bal)
  // Fungsi untuk menghitung saldo dalam Rupiah
  const calculateBalanceInRupiah = (coinPrice, coinAmount) => {
    return coinPrice * coinAmount;
  };

  // Menghitung persentase untuk Buy dan Sell
  const buyPercentage = calculatePercentage(avg, buy);
  const sellPercentage = calculatePercentage(avg, sell);

  // Menentukan apakah avg lebih dekat ke Buy atau Sell
  const isCloserToBuy = avg < buy && avg<sell;

  // Tentukan harga yang relevan
  const relevantPrice = isCloserToBuy ? buy : sell;
  const relevantPriceLabel = isCloserToBuy ? "Buy Price" : "Sell Price";

  // Menentukan warna dan keterangan berdasarkan kedekatan avg dengan buy atau sell
  const bgColor = isCloserToBuy ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";  // Tetap putih karena itu sesuai dengan tampilan
  const actionText = isCloserToBuy ? "Bersiap untuk menjual" : "Bersiap untuk membeli";

  // Menghitung saldo dalam Rupiah hanya saat membeli
  const balanceInRupiah = isCloserToBuy ? calculateBalanceInRupiah(buy, bal) : 0;  // Hanya dihitung saat membeli

  // Menentukan apakah saldo cukup
  const isBalanceSufficient = balanceInRupiah >= 10500;

  return (
    <div className="w-[250px] mx-auto flex flex-col justify-between bg-white rounded-lg shadow-md border border-gray-200 mt-8">
      <div className={`${bgColor} flex justify-between items-center p-4 text-white rounded-t-lg`}>
        <span className="text-lg font-semibold">Pair: [{pair}]</span>
        <span className="text-sm">Balance : {bal.toFixed(2)}</span>
      </div>

      <div className="p-4">
        {/* Kondisional untuk menentukan warna background dan teks */}
        <div className={`flex justify-between py-2 border-b border-gray-200`}>
          <span className="text-gray-700 w-1/2">Average :</span>
          <span className="font-semibold w-1/2 text-right">{avg}</span>
        </div>
        
        <div className={`flex flex-col justify-center items-center py-2`}>
          <span className="text-gray-700 ">Menjual di harga Market Buy:</span>
          <span className="font-semibold text-right">
            {buy}  ({buyPercentage}%)
          </span>
        </div>
        <div className={`flex flex-col justify-center items-center py-2`}>
          <span className="text-gray-700">Menjual di harga Market Sell:</span>
          <span className="font-semibold text-right">
            {sell} ({sellPercentage}%)
          </span>
        </div>
      </div>

      {/* Menampilkan pesan saldo tidak cukup hanya jika membeli */}
      {isCloserToBuy ? (
        <div className="p-4">
          {isBalanceSufficient ? (
            <p className="text-green-500 text-center font-semibold">Saldo Cukup:<br/> {balanceInRupiah.toFixed(2)} IDR</p>
          ) : (
            <p className="text-red-500 text-center font-semibold">Saldo Tidak Cukup:<br/> {balanceInRupiah.toFixed(2)} IDR</p>
          )}
        </div>
      ) : null}

      {/* Teks Keterangan */}
      <div className={`p-4 ${bgColor} ${textColor} rounded-b-lg`}>
        <p className="text-center text-lg font-semibold">{actionText}</p>
      </div>

    </div>
  );
};

export default Card;
