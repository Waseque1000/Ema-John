import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  const { _id, name, img, seller, price, quantity, ratings } = props.product;

  const handelAddToCard = props.handelAddToCard;
  return (
    <div className="product">
      <img className="product" src={img} alt="" />

      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p>Price:$ {price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings}</p>
      </div>
      <button
        onClick={() => handelAddToCard(props.product)}
        className="btn-cart "
      >
        Add to Cart
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;
