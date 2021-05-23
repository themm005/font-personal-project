import {useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContextProviders'
import localStorageService from '../../services/localStorageService'
import Button from '@material-ui/core/Button'
import { Badge, IconButton, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import { ShoppingCart } from '@material-ui/icons/'
import CartPopover from "../cart/CartPopover"


function CartLogout(){

  const history = useHistory()
  
  const {setIsAuthenticated} = useContext(AuthContext)
  const [isShopOwner,setShopOwner] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorageService.getToken()
  useEffect(()=>{
    const payload =  token.split('.')[1]
    const data =  atob(decodeURIComponent(payload))
    const detail = JSON.parse(data)
    if (detail.role === 'SHOPOWNER') return setShopOwner(true)
    
  },)

  const handleLogout = e =>{
    e.preventDefault();
    localStorageService.clearToken();
    setIsAuthenticated(false);
    history.push('/')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        paddingRight: "70px",
        alignContent: "center",
        alignItems: "center",
        margin: "auto",
        marginLeft: "0",
        marginRight: "0",
        display: "flex",
      }}
    >
      {isShopOwner && (
        <div>
          <Button href="/product">Product</Button>
          <Button href="/register">Register</Button>
          <Button href='/order'>Order</Button>

        </div>
      )}
      <div>
        <CartPopover />
      </div>
      <div>
        <Button
          href="/"
          color="default"
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default CartLogout

