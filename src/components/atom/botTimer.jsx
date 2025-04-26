import React, { useEffect, useState } from 'react';

export default function BotTimer() {
    const [elapsedTime, setElapsedTime] = useState(0);

    // Ambil waktu pukul 00:01 WIB hari ini
    const getStartTime = () => {
        const now = new Date(2025, 3, 25, 0, 0, 1); 
// bulan dihitung dari 0, jadi 3 = April

        const jakarta = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        jakarta.setHours(0, 1, 0, 0); // 00:01 WIB
        return jakarta.getTime();
    };

    useEffect(() => {
        const startTime = getStartTime();

        const interval = setInterval(() => {
            const now = Date.now();
            setElapsedTime(now - startTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const seconds = Math.floor(elapsedTime / 1000) % 60;


    return (
        <div className="text-center font-bold text-lg text-green-600">
            ⏱ Bot aktif: {days} hari {hours} jam {minutes} menit {seconds} detik
        </div>

    );
}
