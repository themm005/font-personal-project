import {
  Button,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "antd/lib/card/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import Snackbar from "../../component/shared/Snackbar";

function CardProduct({ price, productName, desc, imgfile, id, amount }) {
  const { cart, setCart } = useContext(CartContext);
  const [expanded, setExpanded] = useState(false);
  const [noStock, setNoStock] = useState(amount === 0 ? true : false);
  const [openSnackbar, setOpenSnackbar] = useState({ open: false });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  console.log(cart.items)

  const onAddClick = () => {
      cart.items.filter((product) => product.id === id)[0]? 
        amount === cart.items.filter((product) => product.id === id)[0].count ? 
          setOpenSnackbar({
        open: true,
        type: "error",
        message: "Not enough stock!",
          })
          : setCart({
            items: cart.items.map((product) => {
              if (product.id === id) {
                return { ...product, count: product.count + 1 };
              } else {
                return product;
              }
            }),
            open: false,
          })
        : setCart({
            items: [
              ...cart.items,
              { id, count: 1, productName, price, amount, desc, imgfile },
            ],
            open: false,
        });
  };

  const onRemoveClick = () => {
   cart.items.filter((product) => product.id === id)
      ? setCart({
          items: cart.items
            .map((product) => {
              if (product.count === 1 && product.id === id) {
                return 0; //removes the element from array
              } else if (product.count > 0 && product.id === id) {
                return { ...product, count: product.count - 1 };
              } else {
                return product;
              }
            })
            .filter((product)=> product),open: false,
        })
      : setCart(cart);
  };

  return (
    <div>
      <Snackbar {...openSnackbar} setOpen={setOpenSnackbar} />
      <Card style={{ padding: "20px", fontSize: "20px", height: "auto" }}>
        <div style={{ marginBottom:"20px" }}>
          <img
            class="center"
            style={{ textAlign: "center" }}
            src={imgfile}
            width="200"
            crop="scale"
          ></img>
        </div>
        <div style={{ display: "flex" }}>
          <p item style={{ textAlign: "left", fontWeight: "bold" }}>
            {productName}
          </p>
          <CardActions disableSpacing>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout="auto">
          <CardContent>
            <Typography paragraph>{desc}</Typography>
          </CardContent>
        </Collapse>
        <Typography style={{ fontSize: "20px" }}>Price {price}฿</Typography>
        {noStock && (
          <Typography style={{ fontSize: "20px", color: "red" }}>
            OUT OF STOCK
          </Typography>
        )}
        {!noStock && (
          <div style={{ display: "flex" }}>
                   

            {cart.items.filter((product) => product.id === id)[0]?.count ? <Button
              item
              style={{ position: "right", marginTop: "20px" }}
              variant="contained"
              size="small"
              color="primary"
              onClick={onRemoveClick}
            >
              <strong>–</strong>
            </Button> : <Button
              item
              style={{ position: "right", marginTop: "20px" }}
              variant="contained"
              size="small"
                color="primary"
                disabled
            >
              <strong>–</strong>
            </Button>}
            <Typography
              variant="h6"
              component="p"
              style={{
                fontSize: "20px",
                margin: " auto 20px",
                marginTop: "20px",
              }}
            >
              {cart.items.filter((product) => product.id === id)[0]?.count || 0}
            </Typography>
            <Button
              item
              style={{ position: "right", marginTop: "20px" }}
              variant="contained"
              size="small"
              color="primary"
              onClick={onAddClick}
            >
              <strong>+</strong>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
export default CardProduct;
