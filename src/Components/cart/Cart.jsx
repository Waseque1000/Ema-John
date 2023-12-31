import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, price, handelClearDb, children }) => {
  //   const cart = props.cart;  // ! option -1
  //   const { cart } = props; // ? option -2

  //!  price ta ber  korer jonno for of use korte hbe
  let total = 0;
  let totalShiping = 0;
  let quantity = 0;
  for (const product of cart) {
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalShiping = totalShiping + product.shipping;
    quantity = quantity + product.quantity;
  }

  //! tax
  const tax = (total * 7) / 100;
  // * aita diye all cart er output dkha jay
  // console.log(cart);
  //? grandTotal
  const grandTotal = (total + totalShiping + tax).toFixed(2);
  return (
    <div className="cart">
      <h3>Order Sumary</h3>
      <h4>Selected Items: {quantity}</h4>
      <h4>Total Price: ${total}</h4>
      <h4>Shipping:$ {totalShiping}</h4>
      <h4>Tax: ${tax.toFixed(2)}</h4>
      <h2>Grand Total: ${grandTotal}</h2>
      <button onClick={handelClearDb} className="cart-btn">
        Clear Cart
        <FontAwesomeIcon className="dlt-icons" icon={faTrashAlt} />
      </button>
      {children}
    </div>
  );
};

export default Cart;
