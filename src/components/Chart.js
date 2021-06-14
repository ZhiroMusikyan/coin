import React, {useEffect, useState} from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import {makeStyles} from "@material-ui/core";
import getData from "../query/GetData";

const useStyle = makeStyles(() => ({
    container: {
        paddingTop: 30,
        paddingLeft: 30,
    }
}));

const Chart = ({coinId, coinName, days}) => {
    const classes = useStyle();
    const [data, setData] = useState();

    const creatData = (arr) => {
        setData(arr.map((i) => {
            return {date: new Date(i[0]).toLocaleDateString(), [coinName]: i[1]}
        }))
    };

    useEffect(async () => {
        let historyData = await getData(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
        creatData(historyData?.prices)
    }, [coinId, days]);
    return (
        <div className={classes.container}>
            <AreaChart
                width={1100}
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" angle={60} dy={20} height={90} tickSize={10} interval={0}/>
                <YAxis padding={{top: 34}}/>
                <Tooltip separator={' _ to USD '}/>
                <Legend verticalAlign="bottom"/>
                <Area dataKey={coinName} fill="#82ca9d" fillOpacity={0.3}/>

                {/*<Area dataKey={coinName} troke="#8884d8" fill="yellow"/>*/}
            </AreaChart>
        </div>
    );
};
export default Chart

