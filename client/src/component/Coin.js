import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Coins from './Coins'
import './Coin.css'


const Coin = (props) => {
    //검색 state
    const [search, setSearch] = useState('')
    //원화 BTC 모드
    const [KB, setKB] = useState('K')
    //마켓
    const [data, setDate] = useState('loding')
    //tab state
    const [value, setValue] = useState(0);
    //tab state 변경
    const handleChange = (event, newValue) => {
        setValue(newValue);
        //원화<-->btc 모드 전환
        if(newValue===0){
            setKB('K')
        } else{
            setKB('B')
        }
    }

    const onChange = e => {
        setSearch(e.target.value);
      };

    useEffect(() => {
        axios.get('https://api.upbit.com/v1/market/all')
            .then(data => {
                //모드에 따라 필터
                console.log('모드'+KB)
                let filterData = data.data.filter((i) =>
                    i.market[0] === `${KB}` )
                    console.log(filterData)
                setDate(filterData);
                if(search !== ''){
                let searchData = filterData.filter((i) => 
                    i.korean_name === search
                )
                setDate(searchData)
                }
            })
    }, [KB,search]);
    if (data === 'loding') {
        return (
            <div>
                loding
          </div>
        )
    }
    return (
        <div className='Coin'>
            <TextField id="standard-search" onChange={onChange} label="Search field" type="search" />
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab name={'K'} label="원화거래" />
                <Tab name={'B'} label="BTC" />
            </Tabs>
            <div className='scroll'>
            {data.map((i, index) => (
                <Coins data={i} key={index} event={props.event} event2={props.event2}/>
            ))}
            </div>
        </div>
    );
};

export default Coin;