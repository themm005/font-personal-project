import { Button } from "@material-ui/core"
import EditPopover from "../Product/EditProductPopover"


function ProductEdit({price,productName,id,desc,amount,imgfile,type}){
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p>{productName}</p>
      </div>
      <div style={{ width: "100px", textAlign: "center", marginLeft: "50px" }}>
        <p>{price}</p>
      </div>
      <div
        style={{
          width: "100px",
          fontWeight: "bold",
          color: "green",
          textAlign: "center",
          marginRight: "20px",
        }}
      >
        <p>{amount}</p>
      </div>
      <div>
        <EditPopover
          price={price}
          productName={productName}
          id={id}
          desc={desc}
          imgfile={imgfile}
          amount={amount}
          type={type}
        />
      </div>
    </div>
  );
}
export default ProductEdit