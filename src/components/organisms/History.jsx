// History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableHistory from '../molecules/TableHistory';

const History = ({ history, dataBal, idr }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [dataHistory, setDataHistory] = useState([]);


    // console.log(dataNow)
    const today = new Date().toISOString().split("T")[0];

    const [filterDone, setFilterDone] = useState(false);
    const [filterToday, setFilterToday] = useState(false);
    const dataNow = history.filter(item => item.timeFilter === today);
    const filteredData = history.filter(item => {
        const isStatusOk = !filterDone || item.statusBuy === "filled" && item.statusSell === "done";
        return isStatusOk;
    });


    return (
        <div>
            {/* Tombol untuk sorting */}
            <div className="flex space-x-4 mb-4 items-center justify-center flex-col mt-10">
                <h2>Riwayat Transaksi</h2>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            <div>
                <div>
                    <h2 className="text-xl font-bold text-green-600 mb-2">
                        BUY {history.length}
                    </h2>
                    <div className="flex gap-4 mb-4">
                        <label>
                            <input type="checkbox" checked={filterDone} onChange={() => setFilterDone(!filterDone)} />
                            Status Done
                        </label>
                        <label>
                            <input type="checkbox" checked={filterToday} onChange={() => setFilterToday(!filterToday)} />
                            Hari Ini
                        </label>
                    </div>


                    <TableHistory history={!filterDone? dataNow : filteredData} />
                </div>
            </div>


        </div>
    );
};

export default History;
