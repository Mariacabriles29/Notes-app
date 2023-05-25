import React from "react";
import "./App.scss";
import { Layout } from "./layout/Layout";
import { AppRouter } from "./routers/AppRouter";
import { UserProvider } from "./auth/AuthContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;
