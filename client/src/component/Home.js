import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";
import axios from 'axios';
import ButtonAppBar from './ButtonAppBar'
import Coin from './Coin'
import './Home.css'
import Cdats from './Cdats'

const Home = (props) => {
    //market 변경
    const [market, setMarket] = useState('KRW-BTC')
    const [hanMarket, setHan] = useState('비트코인')
    const [candle, setCandle] = useState('loding');
    const changeMarket = (e) => {
        // console.log(e)
        setMarket(e);
    }
    const changehan = (e) => {
        // console.log(e)
        setHan(e);
    }
    useEffect(() => {
        console.log('마켓='+market)
        axios.get(`https://api.upbit.com/v1/candles/minutes/1?market=${market}&count=9`)
            .then(data => {
                console.log('캔들')
                console.log(data)
                setCandle(data);
            })
        const timer = setInterval(() => {
            axios.get(`https://api.upbit.com/v1/candles/minutes/1?market=${market}&count=9`)
                .then(data => {
                    console.log('실시간캔들')
                    console.log(data)
                    setCandle(data);
                })
        }, 100*60);
        return () => {
            clearInterval(timer);
        };
        //마켓이 변할때마다 실행
    },[market]);
    //첫랜더 로딩화면
    if (candle === 'loding') {
        return (
            <div>
                loader
            </div>
        )
    }
    return (
        <div>
            <ButtonAppBar isLogin={props.isLogin}
            handleIsReverseLoginChange={props.handleIsReverseLoginChange}/>
        <div className='Home'>
            <div className='Cview'>
            <Cdats market={market} han={hanMarket}/>
            <Chart
                width={'100%'}
                height={350}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['time', '저가-고가,시가-종가', 'b', 'c', 'd'],
                    [new Date(candle.data[8].candle_date_time_kst).toLocaleTimeString(), candle.data[8].high_price, candle.data[8].opening_price, candle.data[8].trade_price, candle.data[8].low_price],
                    [new Date(candle.data[7].candle_date_time_kst).toLocaleTimeString(), candle.data[7].high_price, candle.data[7].opening_price, candle.data[7].trade_price, candle.data[7].low_price],
                    [new Date(candle.data[6].candle_date_time_kst).toLocaleTimeString(), candle.data[6].high_price, candle.data[6].opening_price, candle.data[6].trade_price, candle.data[6].low_price],
                    [new Date(candle.data[5].candle_date_time_kst).toLocaleTimeString(), candle.data[5].high_price, candle.data[5].opening_price, candle.data[5].trade_price, candle.data[5].low_price],
                    [new Date(candle.data[4].candle_date_time_kst).toLocaleTimeString(), candle.data[4].high_price, candle.data[4].opening_price, candle.data[4].trade_price, candle.data[4].low_price],
                    [new Date(candle.data[3].candle_date_time_kst).toLocaleTimeString(), candle.data[3].high_price, candle.data[3].opening_price, candle.data[3].trade_price, candle.data[3].low_price],
                    [new Date(candle.data[2].candle_date_time_kst).toLocaleTimeString(), candle.data[2].high_price, candle.data[2].opening_price, candle.data[2].trade_price, candle.data[2].low_price],
                    [new Date(candle.data[1].candle_date_time_kst).toLocaleTimeString(), candle.data[1].high_price, candle.data[1].opening_price, candle.data[1].trade_price, candle.data[1].low_price],
                    [new Date(candle.data[0].candle_date_time_kst).toLocaleTimeString(), candle.data[0].high_price, candle.data[0].opening_price, candle.data[0].trade_price, candle.data[0].low_price]
                ]}
                options={{
                    legend: 'none',
                    candlestick: {
                        risingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                        fallingColor: { strokeWidth: 0, fill: 'blue' }
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />
            </div>
            {/* 이벤트 마켓 이벤트2 코인 한글이름 */}
            <Coin event={changeMarket} event2={changehan}/>
        </div>
    </div>
    );
};

export default Home;