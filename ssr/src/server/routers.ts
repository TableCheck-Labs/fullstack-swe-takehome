import { setCanonicalPage } from "./middleware";
import { Router } from "./router";

export const { router: reserveRouter } = new Router(
  "reserve",
  ["/:locale/:shop/reserve", "/:shop/reserve"],
  [
    setCanonicalPage("reserve"),
    async (req, res, next) => {
      res.locals.hydratedState = {
        title: "reserve",
      };
      res.locals.html = await res.locals.render(res.locals.renderers.reservePageRenderer);
      next();
    },
  ],
);

export const { router: waitlistRouter } = new Router(
  "waitlist",
  ["/:locale/:shop/waitlist", "/:shop/waitlist"],
  [
    setCanonicalPage("waitlist"),
    async (req, res, next) => {
      res.locals.hydratedState = {
        title: "waitlist",
      };
      res.locals.html = await res.locals.render(res.locals.renderers.waitlistPageRenderer);
      next();
    },
  ],
);

export const { router: menuRouter } = new Router(
  "menu",
  ["/:locale/:shop/menu", "/:shop/menu"],
  [
    setCanonicalPage("menu"),
    async (req, res, next) => {
      res.locals.hydratedState = {
        title: "menu",
      };
      res.locals.html = await res.locals.render(res.locals.renderers.menuPageRenderer);
      next();
    },
  ],
);
