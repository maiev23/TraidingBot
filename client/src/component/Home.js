import React, { Component } from 'react';
import Chart from "react-google-charts";
import Logout from "./Logout"
import { Link, Route, withRouter } from 'react-router-dom';
import Hoga from "./Hoga"
import './Home.css'
//this.props = islogin
class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {
        data: {}, 
      };
    }
    render() {
        return (
            <div className='home'>
                <div className = 'menu'>
                    <Logout/>
                </div>
                <Chart
                    width={'100%'}
                    height={350}
                    chartType="CandlestickChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        /*날짜 최상위 최종가 시작가 최하가*/
                        ['day', 'a', 'b', 'c', 'd'],
                        ['Mon', 20, 28, 38, 45],
                        ['Tue', 31, 38, 55, 66],
                        ['Wed', 50, 55, 77, 80],
                        ['Thu', 77, 77, 66, 50],
                        ['Fri', 68, 66, 22, 15],
                    ]}
                    options={{
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                <Hoga/>
            </div>
        );
    }
}

export default Home;