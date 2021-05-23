import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth'
import Main from './pages/Main'
import Register from './pages/Register'
import Product from './pages/Product'
import { useContext } from 'react';
import { AuthContext} from './contexts/AuthContextProviders'
import Cart from './pages/Cart'
import Order from './pages/Order'


const privateRoutes = [
  {
    path: '/',
    component: Main
  },
  {
    path:'/register',
    component: Register
  },
  {
    path:'/product',
    component: Product
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path: '/order',
    component: Order
  }
];

const publicRoutes = [
  {
    path:'/',
    component: Auth
  }
]

function App() {

  const { isAuthenticated }  = useContext(AuthContext)

  return (
    <Switch>
       {isAuthenticated &&
        privateRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}

      {!isAuthenticated &&
        publicRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)} 
      <Redirect to="/" />  
    </Switch>
  );
}

export default App;
