import React, { useState,useEffect } from 'react';
import Entry from './Entry'
import axios from 'axios'
const ListEntry = (props) => {
    const [data, setData] = useState('')
    useEffect(()=>{
        let atoken = localStorage.getItem('atoken')
        const config = {
            headers: { "accessToken": `${atoken}` },
          }
        axios.post('http://localhost:4000/meme/list',{'status': props.mode}, config)
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
                <Entry data={i} key={index} delete={setData} mode={props.mode}/>
            ))}
        </div>
        );
};

export default ListEntry;