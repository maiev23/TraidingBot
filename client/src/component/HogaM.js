import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


function number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const HogaM = (props) => {
return (
<TableRow>
<TableCell></TableCell>
<TableCell>{number(props.bid_price)}</TableCell>
<TableCell>{props.bid_size.toFixed(3)}</TableCell>
</TableRow>
)
}

export default HogaM;