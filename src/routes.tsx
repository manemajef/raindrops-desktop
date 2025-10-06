import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import GetStarted from "./pages/get-started";
import Welcome from "./pages/welcome";

import MainLayout from "./layouts/main-layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome/register" element={<GetStarted />} />

        {/* Main layout routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
