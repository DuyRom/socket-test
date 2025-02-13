// src/RealTimeData.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const RealTimeData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL);

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('message', (newData) => {
            console.log('Received data:', newData);
            setData(newData);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Real Time Data</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data received yet...</p>}
        </div>
    );
};

export default RealTimeData;