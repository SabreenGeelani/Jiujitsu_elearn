import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "./Components/Layout/Layout";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
