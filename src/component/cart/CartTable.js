import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CartContext } from "../../contexts/CartContext"
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


export default function BasicTable() {
  const classes = useStyles();
  const {cart, setCart} = useContext(CartContext)


  return (
      <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    <strong>Products</strong>
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    <strong>Price</strong>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    <strong>Pieces</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography variant="h6">{row.productName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <img src={row.imgfile} style={{ height: "100px" }} />
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="h6">{row.price}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{row.count}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    
  );
}
