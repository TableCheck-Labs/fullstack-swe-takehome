import { Middleware } from "~/server/types";
import { client } from "~/services/api";

export const getShop: Middleware = async (req, res, next) => {
  const { shop: name } = req.params;
  const shop = await client.getShop(name);
  res.locals.data.shop = shop;
  next();
};
