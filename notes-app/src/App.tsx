import React from "react";
import "./App.scss";
import { Layout } from "./layout/Layout";
import { AppRouter } from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
