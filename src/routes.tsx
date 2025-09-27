import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/home-page";
import GetStarted from "./pages/get-started";
import Welcome from "./pages/welcome";

import MainLayout from "./layouts/main-layout";

// function Register() {
//   return <GetStarted />;
// }
function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const token = await window.authApi.verify();
        setValid(!!token);
      } catch (err) {
        console.error("token failed");
        setValid(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-4xl font-black text-foreground/60">Loading....</h1>
      </div>
    );
  if (!valid) return <Navigate to="/welcome" replace />;
  return <Outlet />;
}
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/welcome/register" element={<GetStarted />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/get-started" element={<GetStarted />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
