import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section id="LatestCollection" className="my-14 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            Discover our latest collection of custom-made garments, designed to
            reflect your unique style and fit perfectly. Explore a wide range of
            styles and fabrics that cater to every taste. Each piece is crafted
            with care, ensuring high quality and personalized service.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {latestProducts.map((item) => (
            <div
              key={item._id}
              className="transition-transform hover:-translate-y-1"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
