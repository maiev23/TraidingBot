import React from 'react';
import './Table.css';
const Table = () => {
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
            <th rowSpan='2'>주문시간</th>
            <th>마켓명</th>
            <th>감시가격</th>
            <th>주문량</th>
            <th rowSpan='2'>취소</th>
        </tr>
        <tr>
            <th>구분</th>
            <th>주문가격</th>
            <th>미채결량</th>
        </tr>
    </thead>
    </table>
    );
};

export default Table;