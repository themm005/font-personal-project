import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Logo from './logo'
import CartLogout from './cart-logout'
function Navbar(){
  return (
    <div>
      <Container
        maxWidth
        style={{
          padding: "10px 20px",
          backgroundColor: "#CDCDFA",
          height: "80px",
          
        }}
      >
        <Grid container justify="space-between">
          <Logo />
          <CartLogout />
        </Grid>
      </Container>
    </div>
  );
}
export default Navbar