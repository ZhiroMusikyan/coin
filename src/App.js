import React, {useEffect, useState} from "react";
import EnhancedTable from "./components/Table";
import TopBar from './components/TopBar'
import Chart from './components/Chart'
import {makeStyles} from "@material-ui/core/styles";
import TimePeriod from "./components/TimePeriod";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 8px)',
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        paddingLeft: 30,
    }
}));
const App = () => {
    const classes = useStyles();
    const [coinId, setCoinId] = useState('');
    const [coinName, setCoinName] = useState('');
    const [days, setDays] = useState(1);

    const handleClick = (event, coinId, coinName) => {
        event.stopPropagation();
        localStorage.setItem('coin', JSON.stringify({name: coinName, id: coinId}));
        setCoinId(coinId);
        setCoinName(coinName);
    };
    const handleTimePeriodChange = (value) => {
        setDays(value);
        localStorage.setItem('daysCount', '' + value)
    };
    const handleGoBack = () => {
        localStorage.removeItem('coin');
        setCoinId('');
        setDays(1);
    };

    useEffect(() => {
        const storageData = localStorage.getItem('coin');
        if (storageData) {
            const {name, id} = JSON.parse(storageData);
            setCoinId(id);
            setCoinName(name);
            setDays(+localStorage.getItem('daysCount'));
        }
    }, []);

    return (
        <div className={classes.root}>
            <TopBar onClick={handleGoBack} isHomePage={!coinId}/>
            {!!coinId ? (
                <div className={classes.container}>
                    <TimePeriod onChange={handleTimePeriodChange} savedDaysValue={days}/>
                    <Chart coinId={coinId} coinName={coinName} days={days}/>
                </div>
            ) : <EnhancedTable handleClick={handleClick}/>}
        </div>
    );
};

export default App;
