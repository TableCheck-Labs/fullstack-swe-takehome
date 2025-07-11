import * as M from "~/server/middleware";
import { Router } from "~/server/router";

export const { router: detailsRouter } = new Router(
  "details",
  ["/:locale/booking/:code", "/booking/:code"],
  [
    M.init,
    M.getUser,
    M.setCanonicalPage("details"),
    M.getReservation,
    M.setShopNameViaReservation,
    M.produceHydratedState((draft, _, res) => {
      draft.shop = res.locals.data.shop;
      draft.reservation = res.locals.data.reservation;
      draft.user = res.locals.data.user;
    }),
    async (req, res, next) => {
      res.locals.html = await res.locals.render(res.locals.renderers.detailsPageRenderer);
      next();
    },
  ],
);
