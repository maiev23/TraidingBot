import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";
import axios from 'axios';

const Home = (props) => {
    const [candle, setCandle] = useState('loding');
    useEffect(() => {
        axios.get('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=6')
        .then(data =>{
            console.log(data)
            setCandle(data);
        })
        const timer = setInterval(() => {
            axios.get('https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=6')
            .then(data =>{
                console.log(data)
                setCandle(data);
            })
        }, 1000*60);
        return () => {
          clearInterval(timer);
        };
      }, []);
      //첫랜더 로딩화면
    if(candle === 'loding'){
        return (
            <div>
                loader
            </div>
        )
    }
    return (
        <div>
            <Chart
                width={'1000px'}
                height={350}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['time', '저가-고가,시가-종가', 'b', 'c', 'd'],
                    [candle.data[5].candle_date_time_utc, candle.data[5].high_price, candle.data[5].opening_price, candle.data[5].trade_price,candle.data[5].low_price],
                    [candle.data[4].candle_date_time_utc, candle.data[4].high_price, candle.data[4].opening_price, candle.data[4].trade_price,candle.data[4].low_price],
                    [candle.data[3].candle_date_time_utc, candle.data[3].high_price, candle.data[3].opening_price, candle.data[3].trade_price,candle.data[3].low_price],
                    [candle.data[2].candle_date_time_utc, candle.data[2].high_price, candle.data[2].opening_price, candle.data[2].trade_price,candle.data[2].low_price],
                    [candle.data[1].candle_date_time_utc, candle.data[1].high_price, candle.data[1].opening_price, candle.data[1].trade_price,candle.data[1].low_price],
                    [candle.data[0].candle_date_time_utc, candle.data[0].high_price, candle.data[0].opening_price, candle.data[0].trade_price,candle.data[0].low_price],
                ]}
                options={{
                    legend: 'none',
                    candlestick: {
                        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default Home;