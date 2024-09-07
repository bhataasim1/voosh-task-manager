import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { AuthFormData, authUserType } from "../types/types";
import { AuthServices } from "../API/authServices";
import toast from "react-hot-toast";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const authServices = new AuthServices();
  const authUser: authUserType | null = useAuthUser();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleRegister = async (data: AuthFormData) => {
    setLoading(true);
    try {
      const res = await authServices.registerUser(data);
    //   console.log("Register data:", res.data.result);

    // we can use the result to directly login the user as we are generating the token on registration
      if (res.data.result) {
        toast.success("Register Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Register failed");
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <div className="border p-10 rounded-xl border-blue-800">
        <AuthForm onSubmit={handleRegister} isRegister />
      </div>
    </div>
  );
};
