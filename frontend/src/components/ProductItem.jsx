import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className="group block text-gray-800"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-50 shadow-sm aspect-[3/4]">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={image[0]}
          alt={name}
        />
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
