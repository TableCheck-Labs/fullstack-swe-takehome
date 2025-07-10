import { Middleware } from "~/server/types";

export const init: Middleware = async (req, res, next) => {
  res.locals.data = {};
  next();
};
