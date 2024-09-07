import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { AuthFormData, authUserType } from "../types/types";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { AuthServices } from "../API/authServices";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const authServices = new AuthServices();
  const authUser: authUserType | null = useAuthUser();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogin = async (data: AuthFormData) => {
    setLoading(true);
    try {
      const res = await authServices.loginUser(data);
      // console.log("Login data:", res.data.data);
      if (res.data.data) {
        signIn({
          auth: {
            token: res.data.data.token,
            type: "Bearer",
          },
          userState: {
            id: res.data.data.user.id,
            name: res.data.data.user.name,
            email: res.data.data.user.email,
          },
        });
        toast.success(`Login Successful ${res.data.data.user.name}`);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  // console.log("authUser:", authUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="border p-10 rounded-xl border-blue-800">
        <AuthForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};
