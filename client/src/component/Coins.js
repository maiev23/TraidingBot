import React from 'react';

const Coins = (props) => {
    return (
        <div className='coins'>
            <div onClick={function(){props.event(props.data.market)}}>{props.data.korean_name}</div>
        </div>
    );
};

export default Coins;