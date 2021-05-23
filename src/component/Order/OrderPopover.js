import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {  IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "../../config/axios"
import TableOrder from "./OrderTable"

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
    width:"500px"
  },
}));



export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [order,setOrder] = useState([])

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const id = (props.id)
    const  a  = await axios.get(`/order/orderbyorderitem/ ${ id }`);
    setOrder(a.data.orderItem[0].OrderItems);
    console.log(a.data.orderItem[0].OrderItems);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <VisibilityIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography
          style={{ marginLeft: "50px", paddingTop: "10px" }}
          variant="h5"
        >
          <strong>Order {props.id}</strong>
        </Typography>
        <Typography className={classes.typography}>
          <TableOrder order={order} />
        </Typography>
      </Popover>
    </div>
  );
}
