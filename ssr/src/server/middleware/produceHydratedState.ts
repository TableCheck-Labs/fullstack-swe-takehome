import { Draft, produce } from "immer";
import { Middleware } from "~/server/types";

export const produceHydratedState =
  (producer: (state: Draft<any>) => void): Middleware =>
  (req, res, next) => {
    res.locals.hydratedState = produce(res.locals.hydratedState || {}, producer);
    next();
  };
