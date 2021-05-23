import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../component/navbar/nav";
import { Container, Paper } from "@material-ui/core";
import OrderList from "../component/Order/OrderList"
import { useEffect, useState } from "react";
import axios from "axios";




const useStyles = makeStyles({
  table: {
    width: 500,
    
  },
});


export default function BasicTable() {
  const classes = useStyles();
  const [order, setOrder] = useState([]);  

 const fetchOrder = async () => {
   const res = await axios.get("/order");
   setOrder(res.data.order);
 };
 useEffect(() => {
   fetchOrder();
 }, []);
  console.log(order );
  return (
    <div
      style={{
        backgroundColor: "#E6E6FA",
        height: "auto",
        minHeight: "100vh",
        borderRadius: "10px",
        paddingBottom: "20px",
      }}
    >
      <Navbar></Navbar>
      <div>
        <Container maxWidth="sm">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ justifyContent: "center", marginRight: "20px" }}>
              My Order
            </h1>
          </div>
          <Paper style={{ padding: "20px" }}>
            <div >
              <div style={{ display: "flex",marginLeft:"50px" }}>
                <p
                  style={{
                    width: "100px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Order
                </p>
                <p
                  style={{
                    width: "100px",
                    textAlign: "center",
                    marginLeft: "50px",
                    fontWeight: "bold",
                  }}
                >
                  Create Date
                </p>
                <p style={{ marginLeft: "50px", fontWeight: "bold" }}>
                  Employee
                </p>
              </div>
              <hr></hr>
              {order.map((order) => (
                <OrderList key={order.id} {...order} />
              ))}
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
