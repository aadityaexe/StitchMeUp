import { useContext, useState, useMemo } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ Update form state on change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Prepare cart items (memoized for performance)
  const orderItems = useMemo(() => {
    let items = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            items.push({
              ...structuredClone(product),
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
    }
    return items;
  }, [cartItems, products]);

  // ✅ Razorpay handler
  const initRazorpayPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Complete your payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment successful!");
            setCartItems({});
            navigate("/orders");
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment verification failed"
          );
        }
      },
    };
    new window.Razorpay(options).open();
  };

  // ✅ Submit order
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Please login to place an order");
    if (!orderItems.length) return toast.error("Your cart is empty");
    if (!method) return toast.error("Please select a payment method");

    try {
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;

      if (method === "cod") {
        response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          {
            headers: { token },
          }
        );
      } else if (method === "stripe") {
        response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          return window.location.replace(response.data.session_url);
        }
      } else if (method === "razorpay") {
        response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          return initRazorpayPayment(response.data.order);
        }
      }

      if (response?.data.success) {
        toast.success("Order placed successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response?.data?.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-6 pt-6 sm:pt-12 min-h-[80vh] border-t"
    >
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right Side - Cart + Payment */}
      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            {[
              { id: "stripe", logo: assets.stripe_logo },
              { id: "razorpay", logo: assets.razorpay_logo },
              { id: "cod", label: "CASH ON DELIVERY" },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setMethod(opt.id)}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === opt.id ? "bg-green-400" : ""
                  }`}
                ></p>
                {opt.logo ? (
                  <img className="h-5 mx-4" src={opt.logo} alt={opt.id} />
                ) : (
                  <p className="text-gray-500 text-sm font-medium mx-4">
                    {opt.label}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
