import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import axios from "../../config/axios";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Fab,
  Paper,
} from "@material-ui/core";import EditIcon from "@material-ui/icons/Edit";


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
    width: "500px",
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [acetpCreat, setAcetpEdit] = useState(false);

  
  
  console.log(props.id)
  const handleClick = async (event) => {
    setAnchorEl(event);
    setProductName(props.productName)
    setPrice(props.price)
    setDesc(props.desc)
    setAmount(props.amount)
    setType(props.type)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerSubmit = async(e) => {
    e.preventDefault();
    const id = props.id;

    const a = await axios.patch(`/product/ ${id}`, {
      productName,
      price,
      desc,
      amount,
      type
    });
    console.log(a);
  };
  
   const handleChange = (event) => {
     setType(event.target.value);
   };
  
  
  
  const open = Boolean(anchorEl);
  const id2 = open ? "simple-popover" : undefined;


 
  return (
    <div>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
      <Popover
        id={id2}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <form onSubmit={handlerSubmit}>
          <Typography
            style={{ marginLeft: "20px", paddingTop: "10px", display: "flex" }}
            variant="h5"
          >
            <strong>Edit Product </strong>
            <img src={props.imgfile} />
          </Typography>
          <Typography className={classes.typography}>
            <TextField
              style={{ marginBottom: "20px" }}
              label="Product Name"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              type="number"
              label="Price"
              fullWidth
              value={price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">฿</InputAdornment>
                ),
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              type="number"
              label="Amount"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              label="Desciption"
              fullWidth
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
            <Select
              style={{ marginBottom: "20px" }}
              fullWidth
              value={type}
              onChange={handleChange}
            >
              <MenuItem value={"DOG"}>DOG</MenuItem>
              <MenuItem value={"CAT"}>CAT</MenuItem>
              <MenuItem value={"FISH"}>FISH</MenuItem>
            </Select>
            <Grid container justify="space-evenly">
              <Button
                type="submit"
                style={{ marginTop: "10px" }}
                color="primary"
                variant="contained"
                size="large"
              >
                Edit
              </Button>
            </Grid>
          </Typography>
        </form>
      </Popover>
    </div>
  );
}
