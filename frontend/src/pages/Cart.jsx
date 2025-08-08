import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      {/* Page Title */}
      <div className="text-2xl mb-6 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.7fr_0.3fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-white rounded-lg shadow-sm p-3"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  className="w-16 sm:w-20 rounded-md shadow-md object-cover"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="font-semibold text-gray-900">
                      {currency}
                      {productData.price}
                    </p>
                    <span className="px-2 py-1 border rounded bg-gray-50 text-xs">
                      Size: {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border rounded w-12 sm:w-16 px-2 py-1 text-center focus:ring-2 focus:ring-black outline-none"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Icon */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total + Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] bg-white rounded-lg shadow-md p-5">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-6 px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
