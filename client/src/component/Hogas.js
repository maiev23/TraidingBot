import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import blue from '@material-ui/core/colors/blue'

function number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Hogas = (props) => {
return (
<TableRow>
<TableCell>{props.ask_size.toFixed(3)}</TableCell>
<TableCell style={{backgroundColor: blue[50]}}>{props.checkCoin ==='K' ? number(props.ask_price):props.ask_price}</TableCell>
<TableCell></TableCell>
</TableRow>
)
}

export default Hogas;
