import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import './Medo.css'
import MedoModal from './MedoModal';
import { withRouter } from 'react-router-dom';



function reducer(state, action) {
    return {
        ...state,
        [action.name]: number(removeComma(action.value))
    };
}
function comma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
    var strArr = obj.split('.');
    while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
        //정수 부분에만 콤마 달기 
        strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
    }
    if (bExists > -1) {
        //. 소수점 문자열이 발견되지 않을 경우 -1 반환
        obj = strArr[0] + "." + strArr[1];
    } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
        obj = strArr[0];
    }
    return obj;//문자열 반환
}
function number(x) {
    if(x<1){
        return x
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function removeComma(str) {
    if (str == 0 || str< 1) {
        return str
    }
    let n = parseInt(str.replace(/,/g, ""));
    return n;
}
const Mesu = (props) => {
    const [jumunGN, setJumonGN] = useState(0)
    const [state, dispatch] = useReducer(reducer,
        {
            mesu: props.mesug,
            jumuns: 0,
        });
    const onChange = e => {
        dispatch(e.target);
    };

    useEffect(() => {
        let token = localStorage.getItem('token')
        axios.post('http://localhost:4000/meme/info', { market: props.market, 'token': token })
            .then(data => {
                console.log(data)
                setJumonGN(data)
            }).catch(err => {
                alert('토큰이 만료되었습니다.')
                props.history.push('/login');
            })
            const timer = setInterval(() => {
                axios.post('http://localhost:4000/meme/info', { market: props.market, 'token': token })
                .then(data => {
                    setJumonGN(data)
                }).catch(err => {
                    alert('토큰이 만료되었습니다.')
                    props.history.push('/login');
                })
            }, 100*60);
            return () => {
                clearInterval(timer);
            };
    }, [props.market]);
    const { mesu, jumuns } = state;
    if (jumunGN === 0) {
        return (
            <div>
                {''}
            </div>
        )
    }
    return (
        <div className='memeAll'>
            <form>
                <div className='jumunGN'>주문가능<div>
                    <strong>{ 
                     (props.market[0]==='K') ? number(Number(jumunGN.data.ask_account.balance).toFixed(0)) : number(Number(jumunGN.data.ask_account.balance).toFixed(0))
                    }</strong><em>{props.market.substring(4,8)}</em></div></div>
                {/* 넘버의 들어가는 인자에 쉼표를 제거 */}
                <div className='mesuGG'>매도가격<em>({props.market.substring(0,3)})</em><input value={mesu} onChange={onChange} name='mesu' type='text'></input></div>
                <div className='jumunSR'>주문수량<em>({props.market.substring(4,8)})</em><input value={jumuns} name='jumuns' onChange={onChange} type='text' ></input></div>
                <div className='jimunTT'>주문총액<em>({props.market.substring(0,3)})</em><input value={props.market[0]==='K' ? number((removeComma(mesu)*removeComma(jumuns)).toFixed(0)) : comma((removeComma(mesu)*removeComma(jumuns)).toFixed(8))} readOnly="readonly" type='text'></input></div>
                <div className='minJMP'><em>최소주문금액 :  {jumunGN.data.market.bid.min_total} {props.market[0]==='K' ? 'KRW' : 'BTC'}</em><em>수수료 :  {jumunGN.data.bid_fee * 100}%</em></div>
                <div className='mesuB'>
                    <MedoModal mesu={mesu} jumuns={jumuns} market={props.market}/>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Mesu);