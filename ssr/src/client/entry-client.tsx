import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { state } from "~/services/hydation";
import { App } from "./App";
import { Menu, Title } from "./Components";
import "./index.css";

const container = document.getElementById("app");

const hydratedState = state.hydrate<any>();

const ReservePageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App content={<div>hi</div>} title={<Title>{hydratedState.shop.bookingTitle}</Title>} />
    </BrowserRouter>
  </React.StrictMode>
);

const WaitlistPageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App content={<div>hi</div>} title={<Title>{hydratedState.shop.waitlistTitle}</Title>} />
    </BrowserRouter>
  </React.StrictMode>
);

const MenuPageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App content={<Menu menu={hydratedState.shop.menu} />} title={<Title>{hydratedState.shop.menuTitle}</Title>} />
    </BrowserRouter>
  </React.StrictMode>
);

const DetailsPageApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App content={<div>hi</div>} title={<Title>{hydratedState.shop.detailsTitle}</Title>} />
    </BrowserRouter>
  </React.StrictMode>
);

const ClientSideRunTimeApp = () => {
  const canonicalPage = container?.dataset.canonicalPage;

  switch (canonicalPage) {
    case "details":
      return <DetailsPageApp />;
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
