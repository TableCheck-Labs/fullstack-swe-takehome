import * as M from "~/server/middleware";
import { Router } from "~/server/router";

export const { router: menuRouter } = new Router(
  "menu",
  ["/:locale/:shop/menu", "/:shop/menu"],
  [
    M.init,
    M.getShop,
    M.setShopNameViaParams,
    M.setCanonicalPage("menu"),
    M.produceHydratedState((draft, _, res) => {
      draft.shop = res.locals.data.shop;
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.menuPageRenderer);
      next();
    },
  ],
);
