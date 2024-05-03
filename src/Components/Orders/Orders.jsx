import React, { useState } from "react";
import Cart from "../cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItems from "../Review/ReviewItems";
import "./order.css";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";

const Orders = () => {
  const savedcart = useLoaderData();
  const [cart, setCart] = useState(savedcart);
  // console.log(savedcart);

  //! function for removing items from cart
  const handelRemoveFromCart = (id) => {
    // console.log(id);

    // ? condition ta holo muloto ai id bade baki guleke dorker tai filter use korbo
    const remaining = cart.filter((product) => product._id !== id);
    setCart(remaining);
    // console.log(remaining);
    // * aita dile ui thake dlt hbr but server site thake dlt hbe na .. server site thake dlt korer jonno fake db thake remove db oi function call kore dite hbe
    removeFromDb(id);
  };

  // ! function ==> this function use to clear all data from database

  const handelClearDb = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItems
            key={product._id}
            handelRemoveFromCart={handelRemoveFromCart}
            product={product}
          ></ReviewItems>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart} handelClearDb={handelClearDb}>
          <Link to={"/checkout"}>
            <button className="checkout-btn">Proceed Checkout</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
