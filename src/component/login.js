import Button  from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import {useContext,useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from '../config/axios'
import { AuthContext } from '../contexts/AuthContextProviders';
import localStorageService from '../services/localStorageService'

function Login() {

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  const { setIsAuthenticated } = useContext(AuthContext);

  const history = useHistory()

  const handlerSubmit = async e => {
    try {
      e.preventDefault();
      const res = await axios.post('/login', {email, password})
      localStorageService.setToken(res.data.token);
      setIsAuthenticated(true)
      history.push('/')
    } catch (err) {
      console.dir(err);
    }
  };

  return (
   
    <Container 
    maxWidth="xl" 
    style={{ paddingTop: '40px' , backgroundColor: '#E6E6FA', height: '100vh' }}>
      
           
          <form onSubmit={handlerSubmit}>  
            <Container maxWidth="xs">
              <h1 style={{justifyItems:"center"}}>Login to Shop</h1>   
              <TextField 
              style={{ marginBottom: '20px' }}  
              label="Username" 
              fullWidth 
              value={email} 
              onChange={e => setEmail(e.target.value)}/>
              <TextField 
              style={{ marginBottom: '60px' }} 
              type="password"
              label="Password" 
              fullWidth
              value ={password}
              onChange={e => setPassword(e.target.value)}/>
            <Grid container justify="space-evenly">
                <Button  type="submit" style={{ marginTop: '10px' }} color="secondary" variant="contained" size="large">Login</Button>
            </Grid>  
            </Container> 
          </form>
        
       
    </Container>  
    
  );
}

export default Login;