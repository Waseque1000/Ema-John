import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
  console.log(ids);
  const loadedProduct = await fetch("http://localhost:5000/productsById", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProduct.json();
  console.log(products);

  // console.log(storedCart);

  const saveProduct = [];
  for (const id in storedCart) {
    const addedProduct = products.find((products) => products._id === id);

    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      saveProduct.push(addedProduct);
    }
  }

  return saveProduct;
};

export default cartProductsLoader;
