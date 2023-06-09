import React, { lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ProductPage />} />
            {/* <Route path="/:country" element={<Detail />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

const MainLayout = lazy(() => import("./layouts/main-layout"));
const NotFoundPage = lazy(() => import("./pages/notfound.page"));
const ProductPage = lazy(() => import("./pages/product.page"));
export default App;
