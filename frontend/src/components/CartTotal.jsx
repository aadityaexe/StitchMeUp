import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  // Format numbers as currency
  const formatPrice = (amount) => {
    return `${currency} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      {/* Title */}
      <div className="mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Price Breakdown */}
      <div className="flex flex-col gap-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-medium">{formatPrice(delivery_fee)}</span>
        </div>
        <hr />
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-lg text-black">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
