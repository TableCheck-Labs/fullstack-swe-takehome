import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";
import { Menu, Title } from "./Components";
import "./index.css";

export function reservePageRenderer(url: string, state: any) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App content={<div>hi</div>} title={<Title>{state.shop.bookingTitle}</Title>} />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export function waitlistPageRenderer(url: string, state: any) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App content={<div>hi</div>} title={<Title>{state.shop.waitlistTitle}</Title>} />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export function menuPageRenderer(url: string, state: any) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App content={<Menu menu={state.shop.menu} />} title={<Title>{state.shop.menuTitle}</Title>} />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export function detailsPageRenderer(url: string, state: any) {
  console.log(state);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App content={<div>hi</div>} title={<Title>{state.shop.detailsTitle}</Title>} />
      </StaticRouter>
    </React.StrictMode>,
  );
}
