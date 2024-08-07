import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/UserProvider.jsx";
import { ChatProvider } from "./context/ChatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider>
    <ChatProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ChatProvider>
</AuthProvider>
);
