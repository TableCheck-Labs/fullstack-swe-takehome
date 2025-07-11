import * as M from "~/server/middleware";
import { Router } from "~/server/router";

export const { router: reserveRouter } = new Router(
  "reserve",
  ["/:locale/:shop/reserve", "/:shop/reserve"],
  [
    M.init,
    M.getUser,
    M.getShop,
    M.setShopNameViaParams,
    M.setCanonicalPage("reserve"),
    M.produceHydratedState((draft, _, res) => {
      draft.shop = res.locals.data.shop;
      draft.user = res.locals.data.user;
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.reservePageRenderer);
      next();
    },
  ],
);
