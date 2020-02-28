import React from 'react';
import './Coins.css'

const Coins = (props) => {
    // console.log(props)
    return (
        <div>
            <div className='coins' onClick={function(){ props.event(props.data.market); props.event2(props.data.korean_name)}}>{props.data.korean_name}</div>
        </div>
    );
};

export default Coins;