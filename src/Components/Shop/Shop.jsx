import { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // TODO: this state for paginaion
  const [currentPage, setCurrentPage] = useState(0);
  //  ? pagination
  // TODO: dropdown
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const { totalProducts } = useLoaderData();
  // TODO:
  // const itemsPerPage = 10;
  const totalPage = Math.ceil(totalProducts / itemsPerPage);
  // console.log(totalPage);

  // ? vvi
  const pageNumbers = [...Array(totalPage).keys()];
  // console.log(totalProducts);

  // //
  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // TODO:
  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemsPerPage]);

  // //? useEffect to load some thing from outside
  // useEffect(() => {
  //   const storedCart = getShoppingCart();
  //   // ? step -1 : get id of the added product
  //   for (const id in storedCart) {
  //     // ? step -2 : get product from products state  by using  id
  //     const addedProduct = products.find((product) => product._id === id);
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

    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsById", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const saveProduct = [];
        // ? step -1 : get id of the added product
        for (const id in storedCart) {
          // ? step -2 : get product from products state  by using  id
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
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
      });
  }, []);

  //! function
  const handelAddToCard = (product) => {
    // console.log(product);
    // spread oparation
    const newCart = [...cart, product];
    setCart(newCart);

    // ? localStorage
    addToDb(product._id);
  };
  // ! function ==> this function use to clear all data from database

  const handelClearDb = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
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
      {/* <div className="okk">
        <p>Current Page : {currentPage}</p> <br />
        <div className="pagination">
          {pageNumbers.map((number) => (
            <Link className="link" key={number}>
              <button onClick={() => setCurrentPage(number)} className="btn-01">
                {" "}
                {number}
              </button>
            </Link>
          ))}
        </div>
      </div> */}

      <div className="okk">
        <p>Current Page : {currentPage}</p> <br />
        <div className="pagination">
          {pageNumbers.map((page) => (
            <button
              className={currentPage === page ? "selected" : undefined}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
