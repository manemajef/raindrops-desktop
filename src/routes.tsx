import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import GetStarted from "./pages/get-started";
import { Button } from "./components/ui/button";
import MainLayout from "./layouts/main-layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
