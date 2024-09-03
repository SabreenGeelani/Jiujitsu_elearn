import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Layout } from "./Components/Layout/Layout";
import AppRoutes from "./Routes/AppRoutes";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import PasswordRecovery from "./Pages/PasswordRecovery/PasswordRecovery";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        <Route
          path="/*"
          element={
            <Layout search={search} setSearch={setSearch}>
              <AppRoutes search={search} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
