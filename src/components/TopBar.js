import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 90,
        backgroundColor: 'beige,'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const TopBar = ({isHomePage, onClick}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {isHomePage ? 'Cryptocurrencies' :
                            <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={onClick}>
                                <ArrowBackIosIcon/>
                                Back
                            </Button>}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default TopBar