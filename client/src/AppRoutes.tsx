import { Route, Routes } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RootLayout from "./layout/RootLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const store = createStore({
  authName: "voosh_auth_token",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const AppRoutes = () => {
  return (
    <AuthProvider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Login />
            </RootLayout>
          }
        />
        <Route
          path="/register"
          element={
            <RootLayout>
              <Register />
            </RootLayout>
          }
        />
        <Route element={<AuthOutlet fallbackPath="/" />}>
          <Route
            path="/dashboard"
            element={
              <RootLayout>
                <Dashboard />
              </RootLayout>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
