const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-6 mb-6">
      {/* Title Text */}
      <h2 className="text-lg sm:text-xl font-medium text-gray-800 tracking-tight">
        {text1} <span className="font-bold text-black">{text2}</span>
      </h2>

      {/* Accent Divider */}
      <span className="h-[2px] w-12 sm:w-16 bg-black rounded-full"></span>
    </div>
  );
};

export default Title;
