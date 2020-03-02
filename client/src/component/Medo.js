import React, { useReducer, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Medo.css'



function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    };
}
function number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function removeComma(str) {
    if (str == 0) {
        return 0
    }
    let n = parseInt(str.replace(/,/g, ""));
    return n;
}
const Medo = (props) => {
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
        axios.post('http://localhost:4000/meme', { market: props.market, 'token': token })
            .then(data => {
                setJumonGN(data)
            }).catch(err=>{
                setJumonGN(0)
            })
    }, [props.market]);
    const { mesu, jumuns } = state;
    if(jumunGN === 0){
        return(
            <div>
                <Link to="/login">다시 로그인 해주십시오</Link>
            </div>
        )
    }
    return (
        <div className='memeAll'>
            <form onSubmit={e => {
                e.preventDefault();
                let token = localStorage.getItem('token')
                axios.post('http://localhost:4000/meme', { market: props.market, 'token': token })
                    .then(data => {})
            }}>
                <div className='jumunGN'>주문가능<div><strong>{number(Number(jumunGN.data.bid_account.balance).toFixed(0))}</strong><em>KRW</em></div></div>
                {/* 넘버의 들어가는 인자에 쉼표를 제거 */}
                <div className='mesuGG'>매수가격<em>(KRW)</em><input value={number(removeComma(mesu))} onChange={onChange} name='mesu' type='text'></input></div>
                <div className='jumunSR'>주문수량<em>(XRP)</em><input value={number(removeComma(jumuns))} name='jumuns' onChange={onChange} type='text'></input></div>
                <div className='jimunTT'>주문총액<em>(KWR)</em><input value={number(mesu * removeComma(jumuns))} readOnly="readonly" type='text'></input></div>
        <div className='minJMP'><em>최소주문금액 :  {jumunGN.data.market.bid.min_total} KRW</em><em>수수료 :  {jumunGN.data.bid_fee*100}%</em></div>
                <div className='mesuB'>
                    <Button variant="contained" color="primary" type='submit' size='large' >
                        매수
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Medo;