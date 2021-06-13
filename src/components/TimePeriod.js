import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 300,
        paddingTop: 30
    },
}));

const marks = [
    {
        value: 1,
        label: "1D"
    },
    {
        value: 5,
        label: "5D"
    },
    {
        value: 10,
        label: "10D"
    },
    {
        value: 15,
        label: "15D"
    },
    {
        value: 20,
        label: "20D"
    }
];


const TimePeriod = ({onChange, savedDaysValue}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-auto" display='block'>
                Time Period:
            </Typography>
            <Slider
                onChangeCommitted={(event, value) => {
                    onChange(value)
                }}
                min={1}
                max={20}
                value={savedDaysValue}
                defaultValue={4}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
            />
        </div>
    );
};
export default TimePeriod