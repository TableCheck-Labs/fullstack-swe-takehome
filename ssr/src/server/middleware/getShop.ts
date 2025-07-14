import { Middleware } from "~/server/types";
import { serverClient } from "~/services/api";

export const getShop: Middleware = async (req, res, next) => {
  const shop = await serverClient.getShop(res.locals.res.locals.shopName);
  res.locals.data.shop = shop;
  next();
};
