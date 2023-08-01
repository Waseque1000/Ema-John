import React from "react";
import "./Reviewitems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItems = ({ product, handelRemoveFromCart }) => {
  //   console.log(product);
  const { name, img, price, quantity, id } = product;
  return (
    <div className="review-items ">
      <img className="review-img" src={product.img} alt="" />

      {/* <div className="review-info"> */}
      <div className="review-details">
        <h3 className="review-title">{name}</h3>
        <p className="price">
          Price : <span className="pp"> ${price}</span>
        </p>
        <h6 className="quantity">
          Quantity:
          <span className="div-quantity"> ${quantity}</span>
        </h6>
      </div>

      <button onClick={() => handelRemoveFromCart(id)} className="btn-delete">
        <FontAwesomeIcon className="dlt-icon" icon={faTrashAlt} />
      </button>
    </div>
    // </div>
  );
};

export default ReviewItems;
