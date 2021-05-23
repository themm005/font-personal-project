import { Container, Grid } from '@material-ui/core';
import { useState,useEffect } from 'react';
import Navbar from '../component/navbar/nav'
import CardProduct from '../component/Product/cardProduct'
import axios from "../config/axios";
// import Snackbar from "../component/shared/Snackbar";
import Laoding from "../img/YCZH.gif";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {  fade ,makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 2),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 2),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


function Main() {
  const [product, setProduct] = useState([])
  const [displayPosts, setDisplayPosts] = useState([]);
  const [obsevedEl, setObsevedEl] = useState(null)
  const [search, setSearch] = useState("");
  const classes = useStyles();
  
  const loadMore = () => {
    setTimeout(() => {
      setDisplayPosts([
        ...displayPosts,
        ...product.slice(
          displayPosts.length,
          product.length > displayPosts.length + 4
            ? displayPosts.length + 4
            : product.length
        ),
      ]);
    },900)
    console.log(search)
  }
  
   const observer = new IntersectionObserver(
     (item) => {
       if (item[0].isIntersecting) {
         loadMore();
       }
     },
     { threshold: 1 }
   );

  const fetchProduct = async () => {
    const res = await axios.get('/product');
    setProduct(res.data.product)
    setDisplayPosts(res.data.product.slice(0, 4));
  };
 
  useEffect(() => {
    if (obsevedEl) {
      observer.observe(obsevedEl);
    }
    return () => {
      if (obsevedEl) {
        observer.unobserve(obsevedEl);
      }
    };
  }, [obsevedEl, observer]);
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(search)


  return (
    <div>
      <Navbar />

      <div
        style={{
          backgroundColor: "#E6E6FA",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl" style={{ paddingTop: "40px" }}>
          <div
            style={{ width: "300px", marginBottom: "20px" }}
            className={classes.search}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e) => setSearch(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Grid container spacing={3}>
            {search.length
              ? product.filter((item) =>
                item.productName.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <Grid item xs={12} md={3}>
                    <CardProduct key={product.id} {...product} />
                  </Grid>
                ))
              : displayPosts.map((product) => (
                  <Grid item xs={12} md={3}>
                    <CardProduct key={product.id} {...product} />
                  </Grid>
                ))}
          </Grid>
        </Container>
        {product.length > displayPosts.length && (
          <img src={Laoding} class="city" ref={setObsevedEl}></img>
        )}
      </div>
    </div>
  );
}

export default Main;

 