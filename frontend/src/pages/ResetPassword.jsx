import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const validatePassword = (password) => {
    // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters, include an uppercase, lowercase, and a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendURL}/api/user/reset-password/${token}`,
        { password: newPassword }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Password reset successful");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Password Input */}
      <div className="w-full relative">
        <label className="block mb-1 text-sm font-medium">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-9 right-3 cursor-pointer text-gray-500"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded"
          required
        />
      </div>

      {/* Back to Login link */}
      <div className="w-full flex justify-end text-sm -mt-2">
        <p
          onClick={() => navigate("/login")}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Back to Login
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-black text-white font-light px-8 py-2 mt-4 rounded 
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"}`}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
