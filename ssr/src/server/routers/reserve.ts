import * as M from "~/server/middleware";
import { Router } from "~/server/router";

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
