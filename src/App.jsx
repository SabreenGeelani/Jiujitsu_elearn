import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SignUp } from "./Pages/SignUppage/SignUp";
import { VerifyEmail } from "./Pages/veryEmail/VerifyEmail";
import { Layout } from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Layout>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
