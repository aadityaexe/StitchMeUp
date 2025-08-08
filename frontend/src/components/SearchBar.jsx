import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="border-t border-b bg-gray-50 py-4 px-3 text-center">
      <div className="flex items-center justify-center gap-3">
        {/* Search Input Container */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full sm:w-2/3 lg:w-1/2 bg-white shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400"
            type="text"
            placeholder="Search for products..."
          />
          <img
            className="w-5 opacity-70"
            src={assets.search_icon}
            alt="Search"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowSearch(false)}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          <img className="w-4" src={assets.cross_icon} alt="Close search" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
