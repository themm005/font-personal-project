import Navbar from '../component/navbar/nav'
import { Container, Grid, TextField,Button,Select,MenuItem,InputLabel,InputAdornment,Fab, Paper } from "@material-ui/core";
import { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import ProductEdit from '../component/Product/productEdit'
import Snackbar from "../component/shared/Snackbar"


function Product(){

  const [modelCreat,setModelCreate] = useState(false)
  const [productName,setProductName] = useState('')
  const [price,setPrice] = useState('')
  const [desc,setDesc] = useState('')
  const [amount,setAmount] = useState('')
  const [type, setType] = useState('');
  const [file,setFile] = useState('')
  const [acetpCreat, setAcetpCreat] = useState(false);
  const [product, setProduct] = useState([])

  
  

  const fetchProduct = async () => {
    const res = await axios.get('/product');
    setProduct(res.data.product)
  };

  useEffect(() => {
    fetchProduct();

  }, []);
  

  const handleFileChange = e =>{
    setFile(e.target.files[0])
  }
  
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleShow = e =>{
    setModelCreate(!modelCreat)
  }
  const handlerSubmit = e =>{
    e.preventDefault();
    
    const formData = new FormData()
    formData.append('productName',productName)
    formData.append('price',price)
    formData.append('desc',desc)
    formData.append('amount',amount)
    formData.append('type',type)
    formData.append('imgfile',file)
    axios
    .post('/product', formData)
    .then(res => {setAcetpCreat(true)})
    .catch(err =>{console.log(err)})
    setProductName('')
    setPrice('')
    setDesc('')
    setAmount('')
    setType('')
    
  }

  console.log(productName);

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundColor: "#E6E6FA",
          height: "auto",
          minHeight: "100vh",
          borderRadius: "10px",
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ justifyItems: "center", marginRight: "20px" }}>
            Create Product
          </h1>
          <Fab
            style={{ marginTop: "15px" }}
            color="primary"
            aria-label="add"
            onClick={handleShow}
          >
            <AddIcon />
          </Fab>
        </div>

        {modelCreat && (
          <div style={{ marginBottom: "20px" }}>
            <form onSubmit={handlerSubmit}>
              <Container maxWidth="xs">
                <Paper style={{ padding: "30px" }} variant="outlined">
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">฿</InputAdornment>
                      ),
                    }}
                    value={price}
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
                  <InputLabel id="demo-controlled-open-select-label">
                    Type
                  </InputLabel>

                  <Select
                    style={{ marginBottom: "20px" }}
                    fullWidth
                    onChange={handleChange}
                    value={type}
                  >
                    <MenuItem value={"DOG"}>DOG</MenuItem>
                    <MenuItem value={"CAT"}>CAT</MenuItem>
                    <MenuItem value={"FISH"}>FISH</MenuItem>
                  </Select>

                  <TextField
                    type="file"
                    onChange={handleFileChange}
                  ></TextField>

                  <Grid container justify="space-evenly">
                    <Button
                      type="submit"
                      style={{ marginTop: "10px" }}
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      Create
                    </Button>
                  </Grid>
                  {acetpCreat ? (
                    <span>
                      <Alert severity="success">
                        Create Product successful
                      </Alert>
                    </span>
                  ) : null}
                </Paper>
              </Container>
            </form>
          </div>
        )}
        <div>
          <Container maxWidth="sm">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1 style={{ justifyContent: "center", marginRight: "20px" }}>
                My Product
              </h1>
            </div>
            
              <Paper elevation={20} style={{ padding: "20px"}}>
                <div>
                  <div style={{ display: "flex" }}>
                    <p style={{ width: "200px", textAlign: "center" }}>
                      Product
                    </p>
                    <p
                      style={{
                        width: "100px",
                        textAlign: "center",
                        marginLeft: "50px",
                      }}
                    >
                      Price
                    </p>
                    <p style={{ marginLeft: "20px" }}>Amount</p>
                  </div>
                  <hr></hr>

                  {product.map((product) => (
                    <ProductEdit key={product.id} {...product} />
                  ))}
                </div>
              </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Product

