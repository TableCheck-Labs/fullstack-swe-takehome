import { hydrateRoot } from "react-dom/client";
import { Store } from "../types";
import { App } from "./App/App";
import { context } from "./App/hydration";

const path = window.location.pathname;
const shopName = path.split('/')[1];
const store = context.hydrate<Store>(shopName);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <App store={store} />
);
