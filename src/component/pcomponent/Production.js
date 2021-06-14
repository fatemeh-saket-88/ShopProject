import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import { NavLink } from 'react-router-dom';

import {connect} from 'react-redux'
import {searchTitle,deletItem} from '../../redux/action'

{/* *************sort  ******************/}
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
{/* ************* end sort  ******************/}

const headCells = [
  { id: 'number', numeric: false, disablePadding: false, label: 'ردیف' },
  { id: 'title', numeric: true, disablePadding: false, label: 'عنوان' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'موجودی' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'قیمت' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'ویرایش' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell >
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='right'    
            width={headCell.numeric ? '750' : '50'}    
            padding='1'   
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Production(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searched,setSearched] = React.useState("");


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

  //which data show in table
  const rowArr = searched.length ?  props.rows.searched :  props.rows.items


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowArr.length - page * rowsPerPage);

  return (
   <div >
    <NavLink to='/new-producrion' style={{marginBottom:"10px"}}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon style={{marginLeft:"6px"}} />}
       >
        جدید
      </Button>
    </NavLink>
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <SearchBar
          value={searched}
          placeholder="جستجو"
          onChange={(e) =>{
            setSearched(e)
            props.searchedItem(e)}
          }
         />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rowArr.length}
            />
            <TableBody>
              {stableSort(rowArr, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="right">
                        {index+1}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{row.Price}</TableCell>
                      <TableCell align="right" >
                          <DeleteIcon color="primary"  onClick={() =>{
                             props.deleteItem(index,searched)
                             }}/>
                          <EditIcon color="primary" onClick={() =>{ 
                            props.history.push('/edit-producrion/'+ row.number)
                          }}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        style={{direction:'ltr'}}
        labelRowsPerPage="نتیجه در صفحه"
        rowsPerPageOptions={[5, 8, 16]}
        component="div"
        count={rowArr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  
   </div>
   );
}
const mapStateToProps=(state)=>({
  rows:state
})
const mapStateToDispatch=(dispatch)=>({
  searchedItem:(value)=>dispatch(searchTitle(value)),
  deleteItem:(number,searchValue)=>dispatch(deletItem(number,searchValue)),
})
export default connect(mapStateToProps,mapStateToDispatch)(Production)

