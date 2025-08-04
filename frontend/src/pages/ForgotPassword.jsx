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
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/forgot-password",
        { email }
      );

      setMessage(response.data.message || "Password reset email sent.");
      setEmail("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Forgot Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Error & Success Messages */}
      {error && (
        <div className="w-full px-3 py-2 text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="w-full px-3 py-2 text-green-600 bg-green-100 rounded">
          {message}
        </div>
      )}

      {/* Email Input */}
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* Back to Login link */}
      <div className="w-full flex justify-end text-sm mt-[-8px]">
        <p
          onClick={() => navigate("/login")}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Back to Login
        </p>
      </div>

      {/* Submit Button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
