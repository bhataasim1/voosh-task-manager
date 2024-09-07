import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { authUserType } from "../types/types";

export const Header: React.FC = () => {
  const auth: authUserType | null = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>
        <nav>
          {auth ? (
            <>
              <span className="mr-4">Welcome, {auth.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="mr-4">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
