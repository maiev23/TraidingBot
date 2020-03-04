import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Hogas from './Hogas';
import HogaM from './HogaM';
import { light } from '@material-ui/core/styles/createPalette';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: 700,
      height: 380,
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
      overflowY: 'scroll',
    },
    body: {
        fontSize: '1.5rem',
        width: 100,
        position: "top",
        align: light
    },
  });

const Hoga = (props) => {
    const [data, setData] = useState('loding')
    const {classes} = props

    useEffect(() => {
        axios.get(`https://api.upbit.com/v1/orderbook?markets=${props.market}`)
            .then(json => {
                console.log(json)
                setData(json)
            })
        const timer = setInterval(() => {
            axios.get(`https://api.upbit.com/v1/orderbook?markets=${props.market}`)
                .then(json => {
                    console.log(1)
                    setData(json)
                })
        }, 100 * 60);
        return () => {
            clearInterval(timer);
        };

    }, [props.market])

    if (data === 'loding') {
        return (
            <div>loding</div>
        )
    }

    return (
        <div>
        <Paper className={classes.root}>
        <Table>
            <TableHead>
                <TableRow>
                    <CustomTableCell align="center" className={classes.body}>매수량</CustomTableCell>
                    <CustomTableCell align="center" className={classes.body}>가격</CustomTableCell>
                    <CustomTableCell align="center" className={classes.body}>매도량</CustomTableCell>
                </TableRow>
            </TableHead>
        <TableBody >
        {data.data[0].orderbook_units.reverse().map(c => {
        return <Hogas checkCoin={props.market[0]} key= {c.ask_price} ask_price={c.ask_price} ask_size={c.ask_size} />
        })}
        {data.data[0].orderbook_units.reverse().map(c => {
        return <HogaM checkCoin={props.market[0]} key= {c.bid_price} bid_price={c.bid_price} bid_size={c.bid_size} />
        })}
        </TableBody>
        </Table>
        </Paper>
        </div>
    );
};

export default withStyles(styles)(Hoga);