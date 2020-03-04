import React from 'react';

function comma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
    var strArr = obj.split('.');
    while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
        //정수 부분에만 콤마 달기 
        strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
    }
    if (bExists > -1) {
        //. 소수점 문자열이 발견되지 않을 경우 -1 반환
        obj = strArr[0] + "." + strArr[1];
    } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
        obj = strArr[0];
    }
    return obj;//문자열 반환
}


const Entry = (props) => {
    const { data } = props
    return (
        <table className='table' >
            <colgroup>
                <col width='94px'></col>
                <col width='100px'></col>
                <col width='104px'></col>
                <col width='104px'></col>
            </colgroup>
            <thead  >
                <tr>
                    <th rowSpan='2'>{new Date(data.created_at).toLocaleTimeString('it-IT')}</th>
                    <th >{data.market}</th>
                    <th >{data.price}</th>
                    <th className='th'rowSpan='2'>{comma(''+data.executed_volume)}</th>
                </tr>
                <tr>
                    <th>{data.side === 'ask' ? '매도' : '매수'}</th>
                    <th >{comma(''+(data.price*data.executed_volume).toFixed(2))}</th>
                </tr>
            </thead>
        </table>
    );
};

export default Entry;