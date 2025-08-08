import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 mt-40 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 grid gap-14 sm:grid-cols-[3fr_1fr_1fr]">
        {/* Brand Info */}
        <div>
          <img src={assets.logo} className="mb-5 w-36" alt="StitchMeUp Logo" />
          <p className="max-w-md leading-relaxed">
            StitchMeUp is a clothing brand that specializes in custom-made
            garments, offering a wide range of styles and fabrics to suit every
            taste. Our mission is to provide high-quality, personalized clothing
            that fits perfectly and reflects your unique style.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-5 text-gray-800">COMPANY</p>
          <ul className="space-y-2">
            {["Home", "About Us", "Delivery", "Privacy Policy"].map(
              (item, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-black transition-colors"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold mb-5 text-gray-800">
            GET IN TOUCH
          </p>
          <ul className="space-y-2">
            <li className="hover:text-black transition-colors">
              +1-212-456-7890
            </li>
            <li className="hover:text-black transition-colors">
              contact@StitchMeUp.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-10 pt-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} StitchMeUp — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
