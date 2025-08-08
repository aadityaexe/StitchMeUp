import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter(
          (item) =>
            item.category === category && item.subCategory === subCategory
        )
        .slice(0, 5);

      setRelated(filtered);
    }
  }, [products, category, subCategory]);

  return (
    <section className="my-20">
      {/* Section Title */}
      <div className="text-center mb-8">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {/* Products Grid */}
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">
          No related products found.
        </p>
      )}
    </section>
  );
};

export default RelatedProducts;
