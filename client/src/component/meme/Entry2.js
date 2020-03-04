import React from 'react';
const Entry = (props) => {
    console.log(props)
    const { data } = props
    console.log(data)

    return (
        <table className='table' >
            <colgroup>
                <col width='94px'></col>
                <col width='100px'></col>
                <col width='104px'></col>
                <col ></col>
            </colgroup>
            <thead >
                <tr>
                    <th rowSpan='2'>{new Date(data.created_at).toLocaleTimeString('it-IT')}</th>
                    <th>{data.market}</th>
                    <th>{data.price}</th>
                    <th rowSpan='2'>{data.executed_volume}</th>
                </tr>
                <tr>
                    <th>{data.side === 'ask' ? '매도' : '매수'}</th>
                    <th>{data.price*data.executed_volume}</th>
                </tr>
            </thead>
        </table>
    );
};

export default Entry;