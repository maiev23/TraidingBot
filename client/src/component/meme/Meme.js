import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Mesu from './Mesu'
import Medo from './Medo'
import './Meme.css'
import { ThemeProvider } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Meme = (props) => {
    //tab state
    const [value, setValue] = useState(0);
    //tab state 변경
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div className="Meme">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab align='center' style={{fontSize:'1.5rem'}} name={'매수'} label="매수" {...a11yProps(0)} />
                <Tab align='center' style={{fontSize:'1.5rem'}} name={'매도'} label="매도" {...a11yProps(1)} />
                <Tab align='center' style={{fontSize:'1.5rem'}} name={'거래내역'} label="거래내역" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Mesu mesug={props.mesug} market={props.market}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Medo mesug={props.mesug} market={props.market}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
};

export default Meme;