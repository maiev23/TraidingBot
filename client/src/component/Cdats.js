import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cdats.css'

//숫자의 쉼표찍는 함수
function number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Cdats = (props) => {
    console.log(props)
    const [data, setData] = useState('loding')

    useEffect(() => {
        axios.get(`https://api.upbit.com/v1/ticker?markets=${props.market}`)
            .then(json => {
                console.log(json)
                setData(json)
            })
        const timer = setInterval(() => {
            axios.get(`https://api.upbit.com/v1/ticker?markets=${props.market}`)
                .then(json => {
                    console.log(1)
                    setData(json)
                })
        }, 100 * 60);
        return () => {
            clearInterval(timer);
        };

    }, [props.market])

    if (data === 'loding') {
        return (
            <div>loding</div>
        )
    }
    const {
        prev_closing_price,
        trade_price,
        low_price,
        high_price,
        acc_trade_price_24h,
        acc_trade_volume_24h } = data.data[0]

    // //전일대비
    // const sum = (trade_price - prev_closing_price)
    // //% 함수
    // const math = function () {
    //     let result = ((trade_price - prev_closing_price) / prev_closing_price) * 100
    //     return result
    // }
    return (
        <div className="all">
            <h2 className='coinName'>{props.han}</h2>
            <div className='dataC'>
                {/*전일대비가 음수이면 파란색 양수이면 빨간색 0이면 검은색*/}
                <div id={(trade_price - prev_closing_price) === 0 ? 'black':''} className={ (trade_price - prev_closing_price) < 0 ? 'blue' : 'red'}>
                    <div className='price'><strong>{props.market[0]==='K' ? number(trade_price.toFixed(0)) :trade_price.toFixed(8)}</strong><em>KRW</em></div>
                    <div className='yesterP'><em>전일대비</em><strong>{(((trade_price - prev_closing_price) / prev_closing_price) * 100).toFixed(2) + '%'}</strong><strong>{((trade_price - prev_closing_price) <= 0) ? '▼' : '▲'}</strong><strong>{props.market[0]==='K' ? number((trade_price - prev_closing_price).toFixed(2)) : (trade_price - prev_closing_price).toFixed(8)}</strong></div>
                </div>
                <div>
                    <div className='highP'><em>고가</em><strong>{number(Math.floor(high_price))}</strong></div>
                    <div className='lowP'><em>저가</em><strong>{number(Math.floor(low_price))}</strong></div>
                </div>
                <div>
                    <div className='trS'><em>거래량(24H)</em><strong>{number(Math.floor(acc_trade_volume_24h))}</strong><em>BTC</em></div>
                    <div className='trP'><em>거래대금(24H)</em><strong>{number(Math.floor(acc_trade_price_24h))}</strong><em>KRW</em></div>
                </div>
            </div>
        </div>
    );
};

export default Cdats;