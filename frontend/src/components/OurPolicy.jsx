import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchanges for your convenience.",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Enjoy 7 days of easy, free returns.",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer assistance.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 py-16 px-6 sm:px-12 bg-gray-50 rounded-xl">
      {policies.map((policy, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <img src={policy.icon} className="w-14 mb-4" alt={policy.title} />
          <p className="text-base font-semibold text-gray-800">
            {policy.title}
          </p>
          <p className="text-gray-500 text-sm mt-1">{policy.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
