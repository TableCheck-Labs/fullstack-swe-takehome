import { Middleware } from "~/server/types";
import { serverClient } from "~/services/api";

export const getShop: Middleware = async (req, res, next) => {
  const { shop: name } = req.params;
  const shop = await serverClient.getShop(name);
  res.locals.data.shop = shop;
  next();
};
