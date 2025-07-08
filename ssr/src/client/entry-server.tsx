import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";
import "./index.css";

export function reservePageRenderer(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App title="reserve" />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export function waitlistPageRenderer(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App title="waitlist" />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export function menuPageRenderer(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App title="menu" />
      </StaticRouter>
    </React.StrictMode>,
  );
}
