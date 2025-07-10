import { Middleware } from "~/server/types";

export const respond200: Middleware = (req, res, next) => {
  const date = new Date();

  console.log(
    JSON.stringify({
      date: date.toISOString(),
      method: req.method,
      path: req.url,
      status: res.statusCode,
      length: res.get("Content-Length"),
      shop: res.locals.shopName,
      duration: date.getTime() - res.locals.start,
    }),
  );

  res.status(200).set({ "Content-Type": "text/html" }).end(res.locals.html);
};
