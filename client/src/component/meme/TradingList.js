import React, { useState } from 'react';
import Rido from '../Radio'
import Table from './Table'
import Table2 from './Table2'
import ListEntry from './ListEntry'
import ListEntry2 from './ListEntry2'
const TradingList = () => {
    const [mode, setMode] = useState('init')
    if(mode==='init'){
        return(
            <div>
                <Rido setMode={setMode}/>
                <Table/>
            </div>
        )
    } else if(mode==='wait'){
        return (
            <div>
                <Rido setMode={setMode}/>
                <Table/>
                <ListEntry mode={mode}/>
            </div>
        );
    } else{
        return (
            <div>
                <Rido setMode={setMode}/>
                <Table2/>
                <ListEntry2 mode={mode} />
            </div>
        );
    }
};

export default TradingList;