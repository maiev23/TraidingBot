import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";
import axios from 'axios';
import ButtonAppBar from './ButtonAppBar'
import Coin from '../coin/Coin'
import './Home.css'
import Cdats from '../coin/Cdats'
import CandleUnit from './CandleUinit'
import Hoga from '../Hoga'
import Meme from '../meme/Meme'

const Home = (props) => {
    //market 변경
    const [market, setMarket] = useState('KRW-BTC')
    const [hanMarket, setHan] = useState('비트코인')
    const [unit, setUnit] = useState('1')
    const [mesug, setMesug] = useState(0)
    const [candle, setCandle] = useState('loding');
    const changeMarket = (e) => {
        // console.log(e)
        setMarket(e);
    }
    const changehan = (e) => {
        // console.log(e)
        setHan(e);
    }
    const changUnit = (e) =>{
        setUnit(e)
    }
    useEffect(() => {
        console.log('마켓='+market)
        axios.get(`https://api.upbit.com/v1/candles/minutes/${unit}?market=${market}&count=121`)
            .then(data => {
                console.log('캔들')
                console.log(data)
                setCandle(data);
            })
        const timer = setInterval(() => {
            axios.get(`https://api.upbit.com/v1/candles/minutes/${unit}?market=${market}&count=121`)
                .then(data => {
                    console.log('실시간캔들')
                    console.log(data)
                    setCandle(data);
                })
        }, 1000*60);
        return () => {
            clearInterval(timer);
        };
        //마켓이 변할때마다 실행
    },[market,unit]);
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
        <div className='Home' >
            <div className='Cview'>
            <Cdats market={market} han={hanMarket}/>
            <div className='candleUnit'>
            <CandleUnit event={changUnit}/>
            </div>
            <div className='chart'>
            <Chart
                width={'99%'}
                height={350}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={candle.data.map((i) =>( 
                    [new Date(i.candle_date_time_kst).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), i.high_price, i.opening_price, i.trade_price, i.low_price]
                )).concat([['time', '저가-고가,시가-종가', 'b', 'c', 'd']]).reverse()
                }
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
            <div className='hogameme'>
                <Hoga market={market}/>
                <Meme mesug={mesug} price={price} market={market}/>
            </div>
            </div>
            {/* 이벤트 마켓 이벤트2 코인 한글이름 */}
            <Coin event={changeMarket} event2={changehan}/>
        </div>
    </div>
    );
};

export default Home;