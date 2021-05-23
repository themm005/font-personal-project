import { Button, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import OrderPopover from "./OrderPopover"

function OrderList({ id, createdAt, Employee }) {

  const handleViewMenu = e => {
    console.log(id)
  }
  const handleDeleteOrder = (e) => {
    console.log(id);
  };

  console.log(Employee);
  return (
    <div style={{ display: "flex" }}>
      
      <div style={{ width: "200px", textAlign: "center" }}>
        <p>{id}</p>
      </div>
      <div
        style={{
          width: "100px",
          textAlign: "center",
          marginLeft: "68 px",
          marginRight: "20px",
        }}
      >
        <p>{createdAt.slice(0, -14)}</p>
      </div>
      <div
        style={{
          width: "100px",
          fontWeight: "bold",
          color: "green",
          textAlign: "center",
          marginRight: "10px",
        }}
      >
        <p style={{ marginLeft: "20px" }}>{Employee.firstName}</p>
      </div>
      <div>
        <OrderPopover id={id} />
      </div>
    </div>
  );
}
export default OrderList;