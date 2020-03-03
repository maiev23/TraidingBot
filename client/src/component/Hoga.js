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


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: 500,
      height: 400,
      marginTop: theme.spacing.unit * 3,
      overflowY: 'scroll',
    },
    body: {
        fontSize: '1.5rem',
        width: 100,
        position: "top"
    },
  });

const Hoga = (props) => {
    console.log('Hoga',props)
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
                    <CustomTableCell className={classes.body}>매수량</CustomTableCell>
                    <CustomTableCell className={classes.body}>가격</CustomTableCell>
                    <CustomTableCell className={classes.body}>매도량</CustomTableCell>
                </TableRow>
            </TableHead>
        <TableBody >
        {data.data[0].orderbook_units.reverse().map(c => {
        return <Hogas key= {c.ask_price} ask_price={c.ask_price} ask_size={c.ask_size} />
        })}
        {data.data[0].orderbook_units.reverse().map(c => {
        return <HogaM key= {c.bid_price} bid_price={c.bid_price} bid_size={c.bid_size} />
        })}
        </TableBody>
        </Table>
        </Paper>
        </div>
    );
};

export default withStyles(styles)(Hoga);