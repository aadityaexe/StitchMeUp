import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className=" flex flex-col sm:flex-row items-center border border-gray-300 rounded-xl overflow-hidden shadow-md">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-50 px-6 sm:px-10 py-12 sm:py-0">
        <div className="text-[#2d2d2d] max-w-md">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 md:w-12 h-[2px] bg-[#2d2d2d]" />
            <p className="uppercase tracking-wide font-medium text-xs md:text-sm text-gray-600">
              Our Bestsellers
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-snug font-bold">
            Latest Arrivals
          </h1>

          {/* Call to Action */}
          <div className="flex items-center gap-3 mt-6 group cursor-pointer">
            <a href="#LatestCollection">
              <p className="font-semibold text-sm md:text-base group-hover:text-red-500 transition-colors">
                Shop Now
              </p>
            </a>
            <span className="w-10 md:w-12 h-[1.5px] bg-[#2d2d2d] group-hover:bg-red-500 transition-colors" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Latest Arrivals"
        />
      </div>
    </section>
  );
};

export default Hero;
