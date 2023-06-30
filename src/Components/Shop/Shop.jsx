import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";
import { addToDb } from "../../utilities/fakedb";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handelAddToCard = (product) => {
    // console.log(product);
    // spread oparation
    const newCart = [...cart, product];
    setCart(newCart);

    // ? localStorage
    addToDb(product.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
