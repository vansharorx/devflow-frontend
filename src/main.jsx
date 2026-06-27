import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import {
  ThemeProvider
} from "./context/ThemeContext";

import {
  SocketProvider
}
from "./context/SocketContext";

import {
  AuthProvider
} from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

 <AuthProvider>

  <SocketProvider>

    <ThemeProvider>

      <App />

    </ThemeProvider>

  </SocketProvider>

 </AuthProvider>
);