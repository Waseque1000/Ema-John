import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const loadedProduct = await fetch("products.json");
  const products = await loadedProduct.json();
  // console.log(products);

  const storedCart = getShoppingCart();
  console.log(storedCart);

  const saveProduct = [];
  for (const id in storedCart) {
    const addedProduct = products.find((products) => products.id === id);

    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      saveProduct.push(addedProduct);
    }
  }

  return saveProduct;
};

export default cartProductsLoader;
