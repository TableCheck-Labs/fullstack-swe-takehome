import { Middleware } from "~/server/types";

export const setShopNameViaParams: Middleware = (req, res, next) => {
  res.locals.shopName = req.params.shop;
  next();
};

export const setShopNameViaReservation: Middleware = (req, res, next) => {
  res.locals.shopName = res.locals.data.reservation.shopId;
  next();
};
