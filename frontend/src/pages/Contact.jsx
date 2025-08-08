import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="text-center text-3xl pt-12 border-t">
        <Title text1="CONTACT" text2="US" />
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          We’d love to hear from you! Get in touch with us below.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="my-14 flex flex-col justify-center md:flex-row gap-10 md:gap-16 mb-28 px-4">
        {/* Left - Image */}
        <img
          className="w-full md:max-w-[480px] rounded-xl shadow-lg object-cover"
          src={assets.contact_img}
          alt="Contact illustration"
        />

        {/* Right - Info */}
        <div className="flex flex-col justify-center items-start gap-6 bg-white p-6 sm:p-8 rounded-lg shadow-md w-full md:w-auto">
          <div>
            <p className="font-semibold text-2xl text-gray-800">Our Store</p>
            <p className="text-gray-500 mt-1 leading-relaxed">
              Khabra <br /> Muzaffarpur, Bihar, India
            </p>
          </div>

          <div>
            <p className="font-semibold text-2xl text-gray-800">Contact</p>
            <p className="text-gray-500 mt-1 leading-relaxed">
              Tel:{" "}
              <a href="tel:+14155550132" className="hover:underline">
                (415) 555-0132
              </a>{" "}
              <br />
              Email:{" "}
              <a
                href="mailto:stitchmeup01@gmail.com"
                className="hover:underline"
              >
                stitchmeup01@gmail.com
              </a>
            </p>
          </div>

          <div>
            <p className="font-semibold text-2xl text-gray-800">
              Careers at Forever
            </p>
            <p className="text-gray-500 mt-1">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-3 border border-black px-8 py-3 text-sm rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
