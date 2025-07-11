import { Middleware } from "~/server/types";
import { serverClient } from "~/services/api/client";

export const getUser: Middleware = async (req, res, next) => {
  const { auth_token } = req.cookies;
  if (!auth_token) return next();
  const parsed = JSON.parse(auth_token);
  const user = await serverClient.getUser(parsed.accessToken);
  res.locals.data.user = user;
  next();
};
