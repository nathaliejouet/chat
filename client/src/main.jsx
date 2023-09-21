import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./components/App";
import Room from "./components/Room";
import "./style.css";
import { UsersProvider } from "./contexts/UsersContext";
import { SocketProvider } from "./contexts/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </SocketProvider>
  </Provider>
);
