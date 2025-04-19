<tr>
  <td colSpan={9}>
    <div className="relative h-2 bg-gray-200 rounded-full mt-1 mb-3">
      {/* Titik buy */}
      <div
        className="absolute top-0 h-2 w-2 bg-green-500 rounded-full -translate-x-1/2"
        style={{ left: `${((buy - min) / (max - min)) * 100}%` }}
        title={`Buy: ${buy}`}
      ></div>

      {/* Titik sell */}
      <div
        className="absolute top-0 h-2 w-2 bg-red-500 rounded-full -translate-x-1/2"
        style={{ left: `${((sell - min) / (max - min)) * 100}%` }}
        title={`Sell: ${sell}`}
      ></div>

      {/* Titik harga sekarang */}
      <div
        className="absolute top-0 h-2 w-2 bg-blue-500 rounded-full -translate-x-1/2"
        style={{ left: `${((buyNow - min) / (max - min)) * 100}%` }}
        title={`Now: ${buyNow}`}
      ></div>
    </div>
  </td>
</tr>