import React from "react";
import "./Cart.css";

const Cart = ({ cart, price }) => {
  //   const cart = props.cart;  // ! option -1
  //   const { cart } = props; // ? option -2

  //!  price ta ber  korer jonno for of use korte hbe
  let total = 0;
  let totalShiping = 0;
  for (const product of cart) {
    total = product.price + total;
    totalShiping = totalShiping + product.shipping;
  }

  //! tax
  const tax = (total * 7) / 100;
  // * aita diye all cart er output dkha jay
  console.log(cart);
  //? grandTotal
  const grandTotal = total + totalShiping + tax;
  return (
    <div className="cart">
      <h3>Order Sumary</h3>
      <h4>Selected Items: {cart.length}</h4>
      <h4>Total Price: ${total}</h4>
      <h4>Shipping:$ {totalShiping}</h4>
      <h4>Tax: ${tax}</h4>
      <h2>Grand Total: ${grandTotal}</h2>
    </div>
  );
};

export default Cart;
