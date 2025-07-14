import * as M from "~/server/middleware";
import { Router } from "~/server/router";

export const { router: menuRouter } = new Router(
  "menu",
  ["/:locale/:shop/menu", "/:shop/menu"],
  [
    M.init,
    M.rateLimitMiddleware({
      buildCacheKey: unixPeriod => `details:${unixPeriod}`,
      onLimit: async (req, res, next) => {
        M.setShopNameViaParams(req, res, next);
        M.getShop(req, res, next);
        M.produceHydratedState(draft => {
          draft.shop = res.locals.data.shop;
        })(req, res, next);
        res.locals.html = await res.locals.render(res.locals.renderers.detailsPageRenderer);
        return () => {
          M.respond200(req, res, next);
        };
      },
    }),
    M.getUser,
    M.setShopNameViaParams,
    M.getShop,
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
