import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Modal from "react-modal";
import { UserProvider } from "./context/userContext";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </BrowserRouter>
);
