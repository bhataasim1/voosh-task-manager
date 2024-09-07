import React, { useState } from "react";
import { AuthFormData } from "../types/types";
import { Link } from "react-router-dom";

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void;
  isRegister?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isRegister = false,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const loginWithGoogle = () =>
    window.open("http://localhost:3000/api/auth/google", "_self");

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      {!isRegister ? (
        <div className="mt-4 flex flex-col items-center justify-center ">
          <h2>
            Dont have an account?
            <Link to={"/register"} className="text-blue-700 font-bold">
              SignUp
            </Link>
          </h2>
          <button
            className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg mt-2"
            onClick={loginWithGoogle}
          >
            LogIn with Google
          </button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center ">
          <h2>
            Already have an account?
            <Link to={"/"} className="text-blue-700 font-bold">
              Login
            </Link>
          </h2>
          <button className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg mt-2">
            SignUp with Google
          </button>
        </div>
      )}
    </div>
  );
};
