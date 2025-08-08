import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {currentState}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {currentState === "Login"
              ? "Welcome back! Please sign in to continue."
              : "Create a new account to get started."}
          </p>
        </div>

        {/* Name field (Sign Up only) */}
        {currentState !== "Login" && (
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Your Name"
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="********"
            required
          />
        </div>

        {/* Links */}
        <div className="flex justify-between items-center text-sm mb-6">
          {currentState === "Login" && (
            <p
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Forgot password?
            </p>
          )}

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-gray-600 hover:text-black transition"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-gray-600 hover:text-black transition"
            >
              Login here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-medium px-4 py-2 rounded-md hover:bg-gray-900 transition"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
