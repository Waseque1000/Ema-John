import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(
      // "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
      "products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // //? useEffect to load some thing from outside
  // useEffect(() => {
  //   const storedCart = getShoppingCart();
  //   // ? step -1 : get id of the added product
  //   for (const id in storedCart) {
  //     // ? step -2 : get product from products state  by using  id
  //     const addedProduct = products.find((product) => product.id === id);
  //     if (addedProduct) {
  //       // ? step 3 : add quantity
  //       const quantity = storedCart[id];
  //       addedProduct.quantity = quantity;
  //     }

  //     console.log(addedProduct);

  //     // ! ei 3 line likher por error aser karon holo prothome jokhon  useEffect load hoy tokhn .. useeffect  products ke na pawer karone er error creat hoy
  //     // const neww = storedCart[id];
  //     // saveProduct.quantity = neww;
  //     // console.log(saveProduct);
  //   }
  //   console.log(storedCart);
  // }, [products]);

  // ? same ta abe kortasi

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveProduct = [];
    // ? step -1 : get id of the added product
    for (const id in storedCart) {
      // ? step -2 : get product from products state  by using  id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // ? step 3 : add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // ? step 4 : add the added product to the save cart
        saveProduct.push(addedProduct);
      }
    }
    // ? set the cart
    setCart(saveProduct);
  }, [products]);

  //! function
  const handelAddToCard = (product) => {
    // console.log(product);
    // spread oparation
    const newCart = [...cart, product];
    setCart(newCart);

    // ? localStorage
    addToDb(product.id);
  };
  // ! function ==> this function use to clear all data from database

  const handelClearDb = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handelAddToCard={handelAddToCard}
          ></Product>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart} handelClearDb={handelClearDb}>
          <Link to={"/orders"}>
            <button className="review-btn"> Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
