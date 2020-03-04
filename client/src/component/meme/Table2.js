import React from 'react';
import './Table.css';
const Table2 = () => {
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
            <th rowSpan='2'>주문시간</th>
            <th>마켓명</th>
            <th>체결가격</th>
            <th rowSpan='2'>체결수량</th>
        </tr>
        <tr>
            <th>구분</th>
            <th>체결금액</th>
        </tr>
    </thead>
    </table>
    );
};

export default Table2;