import { Container, Grid, TextField,Button, Paper } from "@material-ui/core";
import {useContext,useState} from 'react'
import axios from '../config/axios'
import { AuthContext } from '../contexts/AuthContextProviders';
import localStorageService from '../services/localStorageService'
import { Alert } from '@material-ui/lab'
import Navbar from '../component/navbar/nav'



function Register(){

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [role,setRole] = useState('EMPLOYEE')
  
  const { setIsAuthenticated } = useContext(AuthContext);
  // const { isAuthenticated }  = useContext(AuthContext)
    const [error, setError] = useState({});
  const [register,setRegister] = useState(false)
  // const history = useHistory()

  const validateInput = () => {
    const newError = {};
    if (!email) newError.email = "email is required";
    if (!password) newError.password = "password is required";
    if (!firstName) newError.firstName = "firstname is required";
    if (!lastName) newError.lastName = "lastname is required";
     if (!phoneNumber) newError.phoneNumber = "phonenumber is required";
    setError(newError);
  };
  

  const handlerSubmit = e =>{
    try {
      e.preventDefault();
       validateInput();
      const res = axios
        .post("/register", {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          phoneNumber,
          role,
        })
        .then((res) => {
          setRegister(true);
        });
      localStorageService.setToken(res.data.token);
      setIsAuthenticated(true)
      setRegister(true)
    } catch (err) {
      
    }
  }

return (
  <div>
    <Navbar></Navbar>
    <div
      style={{
        backgroundColor: "#E6E6FA",
        height: "auto",
        minHeight: "100vh",
        borderRadius: "10px",
      }}
    >
      <Container
        style={{ marginTop: "20px" }}
        maxWidth="xl"
        style={{
          paddingTop: "40px",
          backgroundColor: "#E6E6FA",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <form onSubmit={handlerSubmit}>
          <Container maxWidth="xs">
            <Paper style={{ padding: "30px" }} variant="outlined">
              <h1 style={{ justifyItems: "center" }}>Register Employee</h1>
              <TextField
                style={{ marginBottom: "20px" }}
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <span>
                  <Alert severity="error">{error.email}</Alert>
                </span>
              )}
              <TextField
                style={{ marginBottom: "20px" }}
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <span>
                  <Alert severity="error">{error.password}</Alert>
                </span>
              )}
              <TextField
                style={{ marginBottom: "20px" }}
                type="password"
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TextField
                style={{ marginBottom: "20px" }}
                label="Firstname"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {error.firstName && (
                <span>
                  <Alert severity="error">{error.firstName}</Alert>
                </span>
              )}
              <TextField
                style={{ marginBottom: "20px" }}
                label="Lastname"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {error.lastName && (
                <span>
                  <Alert severity="error">{error.lastName}</Alert>
                </span>
              )}
              <TextField
                style={{ marginBottom: "20px" }}
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {error.phoneNumber && (
                <span>
                  <Alert severity="error">{error.phoneNumber}</Alert>
                </span>
              )}
              <TextField
                disabled
                style={{ marginBottom: "20px" }}
                label="Role"
                fullWidth
                defaultValue="EMPLOYEE"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              {register ? (
                <span>
                  <Alert severity="success">This is a Register succes</Alert>
                </span>
              ) : null}

              <Grid container justify="space-evenly">
                <Button
                  type="submit"
                  style={{ marginTop: "10px" }}
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Register
                </Button>
              </Grid>
            </Paper>
          </Container>
        </form>
      </Container>
    </div>
  </div>
);
}
export default Register;