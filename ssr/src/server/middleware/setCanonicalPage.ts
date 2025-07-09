import { CanonicalPage, Middleware } from "~/server/types";

export const setCanonicalPage =
  (page: CanonicalPage): Middleware =>
  (_, res, next) => {
    res.locals.canonicalPage = page;
    next();
  };
