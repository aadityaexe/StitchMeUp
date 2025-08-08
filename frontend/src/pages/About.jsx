import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg object-cover"
          src={assets.about_img}
          alt="About StitchMeUp"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 leading-relaxed">
          <p>
            StitchMeUp was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Our Mission
            </h3>
            <p>
              Our mission at StitchMeUp is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations — from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-6 text-center">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-20">
        {[
          {
            title: "Quality Assurance",
            text: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
          },
          {
            title: "Convenience",
            text: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
          },
          {
            title: "Exceptional Customer Service",
            text: "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex-1 border rounded-lg px-8 py-10 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <h4 className="text-lg font-semibold mb-3 text-gray-900">
              {item.title}
            </h4>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
