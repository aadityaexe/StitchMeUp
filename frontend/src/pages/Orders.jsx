import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="border-t pt-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-200"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4 text-sm">
              <img
                className="w-20 h-20 object-cover rounded-md border"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-semibold text-gray-800">
                  {item.name}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: {new Date(item.date).toDateString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Payment: {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${getStatusColor(
                    item.status
                  )}`}
                ></span>
                <p className="text-sm font-medium capitalize">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border border-gray-300 hover:border-black hover:bg-black hover:text-white transition px-4 py-2 text-sm font-medium rounded-md"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}

        {orderData.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            You have no orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
