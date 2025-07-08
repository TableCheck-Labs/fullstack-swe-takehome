import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { state } from "~/services/hydation";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("app");

const hydratedState = state.hydrate<{ title: string }>();

console.log(hydratedState);

const ReservePageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App {...hydratedState} />
    </BrowserRouter>
  </React.StrictMode>
);

const WaitlistPageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App {...hydratedState} />
    </BrowserRouter>
  </React.StrictMode>
);

const MenuPageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App {...hydratedState} />
    </BrowserRouter>
  </React.StrictMode>
);

const ClientSideRunTimeApp = () => {
  const canonicalPage = container?.dataset.canonicalPage;

  switch (canonicalPage) {
    case "reserve":
      return <ReservePageApp />;
    case "waitlist":
      return <WaitlistPageApp />;
    case "menu":
      return <MenuPageApp />;
  }
};

if (import.meta.hot) {
  const root = createRoot(container!);
  root.render(<ClientSideRunTimeApp />);
} else {
  hydrateRoot(container!, <ClientSideRunTimeApp />);
}
