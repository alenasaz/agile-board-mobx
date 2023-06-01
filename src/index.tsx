import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RootStore from "./store";
import CssBaseline from "@mui/material/CssBaseline";

const store = RootStore.create();

export const StoreContext = createContext(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);
