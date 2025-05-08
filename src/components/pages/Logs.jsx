import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../../config/config";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const logEndRef = useRef(null);

    useEffect(() => {
        const socket = io(api.logs, {
            transports: ["websocket"],
        });

        socket.on("bot-log", (msg) => {
            setLogs((prev) => [...prev, msg]);
        });

        return () => socket.disconnect();
    }, []);

    // Scroll ke bawah setiap kali log bertambah
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    return (
        <div
            style={{
                height: "80vh",
                overflowY: "auto",
                backgroundColor: "#111",
                color: "#0f0",
                padding: "1rem",
                fontFamily: "monospace",
            }}
        >
            {logs.map((line, i) => (
                <div className="text-xs" key={i}>{line}</div>
            ))}
            <div ref={logEndRef} />
        </div>
    );
};

export default Logs;
