import * as M from "~/server/middleware";
import { Router } from "./router";

export const { router: reserveRouter } = new Router(
  "reserve",
  ["/:locale/:shop/reserve", "/:shop/reserve"],
  [
    M.setCanonicalPage("reserve"),
    M.produceHydratedState(draft => {
      draft.title = "reserve";
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.reservePageRenderer);
      next();
    },
  ],
);

export const { router: waitlistRouter } = new Router(
  "waitlist",
  ["/:locale/:shop/waitlist", "/:shop/waitlist"],
  [
    M.setCanonicalPage("waitlist"),
    M.produceHydratedState(draft => {
      draft.title = "waitlist";
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.waitlistPageRenderer);
      next();
    },
  ],
);

export const { router: menuRouter } = new Router(
  "menu",
  ["/:locale/:shop/menu", "/:shop/menu"],
  [
    M.setCanonicalPage("menu"),
    M.produceHydratedState(draft => {
      draft.title = "menu";
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.menuPageRenderer);
      next();
    },
  ],
);
