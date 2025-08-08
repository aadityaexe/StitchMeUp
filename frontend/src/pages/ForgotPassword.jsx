import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/user/forgot-password`,
        { email }
      );

      setMessage(response.data.message || "Password reset email sent.");
      setEmail("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md border border-green-200">
            {message}
          </div>
        )}

        {/* Email Input */}
        <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
        />

        {/* Back to Login link */}
        <div className="w-full flex justify-end text-sm mt-2">
          <p
            onClick={() => navigate("/login")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Back to Login
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-medium px-4 py-2 mt-6 rounded-md hover:bg-gray-900 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
