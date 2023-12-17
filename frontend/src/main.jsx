import React from "react"; // react
import { useEffect } from "react"; // state
import { useState } from "react"; // effect
import c from "./c"; // const
import ReactDOM from "react-dom/client"; // dom
import { RouterProvider } from "react-router-dom"; // router
import router from "./router"; // router
// store
import { Provider } from "react-redux";
import { store } from "./store/index";
// css
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
