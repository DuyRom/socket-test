import React, { useEffect, useState } from 'react';

const SOCKET_SERVER_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const RealTimeData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(SOCKET_SERVER_URL);

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log('Received data:', newData);
            setData(newData);
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        return () => {
            socket.close();
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