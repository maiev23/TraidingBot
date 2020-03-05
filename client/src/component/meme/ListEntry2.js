import React, { useState,useEffect } from 'react';
import Entry2 from './Entry2'
import axios from 'axios'
const ListEntry2 = (props) => {
    const [data, setData] = useState('')
    console.log(data)
    useEffect(()=>{
        let atoken = localStorage.getItem('atoken')
        const config = {
            headers: { "accessToken": `${atoken}` },
          }
        axios.post('http://13.209.19.145:4000/meme/list',{'status': props.mode},config)
            .then(data => {
                setData(data)
            }).catch( (err) => {
                console.log(err)
            })
    },[props.mode])
    if(data===''){
        return(
            <div>loding</div>
        )
    }
    return (
        <div className='scroll2'>
            {data.data.map((i,index)=>(
                <Entry2 data={i} key={index} delete={setData} mode={props.mode}/>
            ))}
        </div>
        );
};

export default ListEntry2;