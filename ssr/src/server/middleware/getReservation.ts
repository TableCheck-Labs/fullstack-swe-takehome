import { Middleware } from "~/server/types";
import { serverClient } from "~/services/api/client";

export const getReservation: Middleware = async (req, res, next) => {
  const { reservation, shop } = await serverClient.getReservation(req.params.code);
  res.locals.data.reservation = reservation;
  res.locals.data.shop = shop;
  next();
};
