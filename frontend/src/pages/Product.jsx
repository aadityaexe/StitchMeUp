import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      {/*----------- Product Section -------------- */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 sm:overflow-y-auto overflow-x-auto sm:w-[18%]">
            {productData.image.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                src={img}
                alt={`${productData.name} - view ${index + 1}`}
                className={`cursor-pointer border rounded-lg w-20 h-20 object-cover transition-all hover:scale-105 ${
                  img === image ? "border-orange-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex items-center justify-center">
            <img
              className="w-full h-auto max-h-[500px] object-contain rounded-lg border"
              src={image}
              alt={productData.name}
            />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <p className="pl-2 text-gray-500">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-bold text-orange-600">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 rounded-md transition-all ${
                    s === size
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className={`px-8 py-3 text-sm rounded-md transition-colors ${
              size
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {size ? "Add to Cart" : "Select a Size First"}
          </button>

          {/* Info */}
          <hr className="mt-8" />
          <div className="text-sm text-gray-500 mt-5 space-y-1">
            <p>✅ 100% Original product.</p>
            <p>💵 Cash on delivery available.</p>
            <p>🔄 Easy returns & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Reviews ------------- */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="border px-5 py-3 text-sm font-medium bg-gray-100">
            Description
          </button>
          <button className="border px-5 py-3 text-sm hover:bg-gray-50">
            Reviews (122)
          </button>
        </div>
        <div className="space-y-4 border px-6 py-6 text-sm text-gray-600 leading-relaxed">
          <p>
            An e-commerce website is an online platform that facilitates buying
            and selling products or services over the internet. It serves as a
            virtual marketplace where businesses and individuals can showcase
            products, interact with customers, and conduct transactions without
            a physical presence.
          </p>
          <p>
            E-commerce websites display products with detailed descriptions,
            images, prices, and variations such as sizes and colors. Each
            product has a dedicated page with all relevant information for the
            customer.
          </p>
        </div>
      </div>

      {/* --------- Related Products ---------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
