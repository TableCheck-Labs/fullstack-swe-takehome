import * as M from "~/server/middleware";
import { Router } from "~/server/router";

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
