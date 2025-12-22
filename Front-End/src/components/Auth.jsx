import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://127.0.0.1:8000/users/signup/"
      : "http://127.0.0.1:8000/users/login/";

    const res = await axios.post(url, formData);

    login(res.data.token);
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl mb-4">
        {isSignup ? "Create Account" : "Login"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />
        <button className="bg-black text-white p-2">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <button
        onClick={() => setIsSignup(!isSignup)}
        className="text-sm mt-4 underline"
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}