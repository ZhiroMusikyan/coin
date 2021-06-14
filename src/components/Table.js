import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, {useEffect, useState} from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import getData from "../query/GetData";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'ath', numeric: true, disablePadding: false, label: 'ATH'},
    {id: 'ath_change_percentage', numeric: true, disablePadding: true, label: 'ATH Change Percentage'},
    {id: 'ath_date', numeric: false, disablePadding: false, label: 'ATH Date'},
    {id: 'atl', numeric: true, disablePadding: true, label: 'ATL'},
    {id: 'atl_change_percentage', numeric: true, disablePadding: true, label: 'ATL Change Percentage'},
    {id: 'atl_date', numeric: false, disablePadding: false, label: 'ATL Date'},
    {id: 'circulating_supply', numeric: true, disablePadding: false, label: 'Circulating Supply'},
    {id: 'current_price', numeric: true, disablePadding: false, label: 'Current price'},
    {id: 'fully_diluted_valuation', numeric: true, disablePadding: false, label: 'Fully Diluted Valuation'},
    {id: 'high_24h', numeric: true, disablePadding: false, label: 'High 24h'},
    {id: 'last_updated', numeric: false, disablePadding: false, label: 'Last updated'},
    {id: 'low_24h', numeric: true, disablePadding: false, label: 'Low 24h'},
    {id: 'market_cap', numeric: true, disablePadding: false, label: 'Market Cap'},
    {id: 'market_cap_change_24h', numeric: true, disablePadding: false, label: 'Market Cap change 24h'},
    {
        id: 'market_cap_change_percentage_24h',
        numeric: true,
        disablePadding: false,
        label: 'Market cap change percentage 24h'
    },
    {id: 'market_cap_rank', numeric: true, disablePadding: false, label: 'Market cap rank'},
    {id: 'max_supply', numeric: true, disablePadding: false, label: 'Max supply'},
    {id: 'price_change_24h', numeric: true, disablePadding: false, label: 'Price change 24h'},
    {id: 'price_change_percentage_24h', numeric: true, disablePadding: false, label: 'Price change percentage 24h'},
    {id: 'total_supply', numeric: true, disablePadding: false, label: 'Total supply'},
    {id: 'total_volume', numeric: true, disablePadding: false, label: 'Total volume'},
];
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
    },
    container: {
        height: 510,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));


const EnhancedTableHead = (props) => {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Icon
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const EnhancedTable = ({handleClick}) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);


    // async function fetchData() {
    //     let result = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    //     result = await result.json();
    //     setRows(result);
    // }

    useEffect(async () => {
        const coinsList = await getData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        setRows(coinsList);
    }, []);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        stickyHeader aria-label="sticky table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id, row.name)}
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell align="center">
                                                <img
                                                    src={row.image}
                                                    style={{width: 20, height: 20}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.ath}</TableCell>
                                            <TableCell align="center">{row.ath_change_percentage}</TableCell>
                                            <TableCell
                                                align="center">{new Date(row.ath_date).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.atl}</TableCell>
                                            <TableCell align="center">{row.atl_change_percentage}</TableCell>
                                            <TableCell
                                                align="center">{new Date(row.atl_date).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.circulating_supply}</TableCell>
                                            <TableCell align="center">{row.current_price}</TableCell>
                                            <TableCell align="center">{row.fully_diluted_valuation}</TableCell>
                                            <TableCell align="center">{row.high_24h}</TableCell>
                                            <TableCell
                                                align="center">{new Date(row.last_updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.low_24h}</TableCell>
                                            <TableCell align="center">{row.market_cap}</TableCell>
                                            <TableCell align="center">{row.market_cap_change_24h}</TableCell>
                                            <TableCell align="center">{row.market_cap_change_percentage_24h}</TableCell>
                                            <TableCell align="center">{row.market_cap_rank}</TableCell>
                                            <TableCell align="center">{row.max_supply}</TableCell>
                                            <TableCell align="center">{row.price_change_24h}</TableCell>
                                            <TableCell align="center">{row.price_change_percentage_24h}</TableCell>
                                            <TableCell align="center">{row.total_supply}</TableCell>
                                            <TableCell align="center">{row.total_volume}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 33 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
export default EnhancedTable