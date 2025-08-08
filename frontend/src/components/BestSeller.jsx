import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // UseMemo to avoid recalculating unless products change
  const bestSeller = useMemo(() => {
    return products.filter((item) => item.bestseller).slice(0, 5);
  }, [products]);

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most-loved pieces, chosen by our customers for their
          style, comfort, and quality. Each garment is crafted with care to
          offer you a timeless addition to your wardrobe.
        </p>
      </div>

      {/* Products Grid */}
      <div className="mt-10 grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((item) => (
          <div
            key={item._id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
