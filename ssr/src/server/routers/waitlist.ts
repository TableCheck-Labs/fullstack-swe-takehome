import * as M from "~/server/middleware";
import { Router } from "~/server/router";

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
