const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center bg-gray-50 py-14 px-6 rounded-xl shadow-sm">
      {/* Heading */}
      <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Subscribe & Get <span className="text-red-500">20% Off</span>
      </p>
      <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
        Join our newsletter to stay updated on the latest trends, exclusive
        offers, and new arrivals.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center gap-3 mx-auto mt-6 max-w-xl"
      >
        <input
          className="w-full flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white font-medium rounded-full px-8 py-3 text-sm transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
