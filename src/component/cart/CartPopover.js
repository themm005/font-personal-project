import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Badge, IconButton, MenuItem} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons/";
import CartTable from "../cart/CartTable"
import {CartContext} from "../../contexts/CartContext"
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Snackbar from "../shared/Snackbar"
import axios from "../../config/axios";



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  popover: {
    maxWidth: "500px",
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [total,setTotal]=('')
   const [openSnackbar, setOpenSnackbar] = useState({ open: false });
  const {cart} = useContext(CartContext)

  

  const handleCheckOut = async () => {
    const body = {
      orderItems: cart.items.map((cartItem) => {
        return {
          quantity: cartItem.count,
          productId: cartItem.id,
          price: cartItem.price,
        };
      }),
    };

    await axios.post("/order/", body).then(setOpenSnackbar({
      open: true,
      type: "success",
      message: "Checked out successfully!",
    }))

    
   
    
    

  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Snackbar {...openSnackbar} setOpen={setOpenSnackbar} />

      <IconButton style={{ marginRight: "10px" }} onClick={handleClick}>
        <Badge
          badgeContent={cart.items.reduce((acc, cartItem) => {
            return (acc += cartItem?.count);
          }, 0)}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
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
        <div className={classes.popover}>
          {!cart.items.length && (
            <Typography
              variant="h6"
              style={{ textAlign: "center", margin: "20px" }}
            >
              <strong>CART IS EMPTY</strong>
            </Typography>
          )}

          {!!cart.items.length && (
            <>
              <CartTable />
              <Typography
                variant="h6"
                style={{ position: "relative", left: "345px" }}
              ></Typography>
              <Typography
                variant="h5"
                style={{
                  position: "relative",
                  left: "340px",
                  marginTop: "10px",
                  color: "green",
                }}
              >
                <strong>Total: </strong>
                <strong>
                  {cart.items.reduce((acc, cartItem) => {
                    return (acc += cartItem.count * cartItem.price);
                  }, 0)}{" "}
                  ฿
                </strong>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CheckCircleIcon />}
                style={{ position: "relative", left: "345px" }}
                onClick={handleCheckOut}
              >
                CHECKOUT
              </Button>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
}
