import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import red from '@material-ui/core/colors/red'


function number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const HogaM = (props) => {
return (
<TableRow>
<TableCell></TableCell>
<TableCell  align="center"
            style={{backgroundColor: red[50], fontSize: '1.0rem'}}>
            {props.checkCoin ==='K' ? number(props.bid_price): props.bid_price}</TableCell>

<TableCell  align="center"
            style={{fontSize: '1.0rem'}} >
            {props.bid_size.toFixed(3)}</TableCell>
</TableRow>
)
}

export default HogaM;