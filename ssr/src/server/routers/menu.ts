import * as M from "~/server/middleware";
import { Router } from "~/server/router";

export const { router: menuRouter } = new Router(
  "menu",
  ["/:locale/:shop/menu", "/:shop/menu"],
  [
    M.init,
    M.getUser,
    M.getShop,
    M.setShopNameViaParams,
    M.setCanonicalPage("menu"),
    M.produceHydratedState((draft, _, res) => {
      draft.shop = res.locals.data.shop;
      draft.user = res.locals.data.user;
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.menuPageRenderer);
      next();
    },
  ],
);
