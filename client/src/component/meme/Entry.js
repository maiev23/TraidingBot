import React from 'react';
import axios from 'axios'
const Entry = (props) => {
    console.log(props)
    const { data } = props
    console.log(data)

    const handleClick = () =>{
        let token = localStorage.getItem('token')
        const config = {
            headers: { "token": `${token}` },
          }
        axios.post('http://localhost:4000/meme/cancle',{'uuid': props.data.uuid},config)
            .then(()=> {
                axios.post('http://localhost:4000/meme/list',{'status': props.mode},config)
                .then(data => {
                    props.delete(data)
                }).catch( (err) => {
                    console.log(err)
                })
            }).catch( (err) => {
                console.log(err)
            })
    }

    return (
        <table className='table' >
            <colgroup>
                <col width='82px'></col>
                <col width='90px'></col>
                <col width='104px'></col>
                <col ></col>
                <col width='64px'></col>
            </colgroup>
            <thead >
                <tr>
                    <th rowSpan='2'>{new Date(data.created_at).toLocaleTimeString('it-IT')}</th>
                    <th>{data.market}</th>
                    <th>-</th>
                    <th>{data.volume}</th>
                    <th rowSpan='2'><button onClick={handleClick}>취소</button></th>
                </tr>
                <tr>
                    <th>{data.side === 'ask' ? '매도' : '매수'}</th>
                    <th>{data.volume}</th>
                    <th>{data.remaining_volume}</th>
                </tr>
            </thead>
        </table>
    );
};

export default Entry;