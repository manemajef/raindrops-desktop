import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import HomePage from "./pages/home-page";
import GetStarted from "./pages/get-started";
import { Button } from "./components/ui/button";
import MainLayout from "./layouts/main-layout";
import { Home } from "lucide-react";

function Welcome() {
  return <HomePage />;
}
function Register() {
  return <GetStarted />;
}
function ProtectedRoute() {
  const token = process.env.RAINDROP_TOKEN;
}
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />}>
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
