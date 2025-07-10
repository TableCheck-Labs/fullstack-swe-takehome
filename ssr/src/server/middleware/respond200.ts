import { Middleware } from "~/server/types";

export const respond200: Middleware = (req, res, next) => {
  const date = new Date();

  console.log(
    JSON.stringify({
      date: date.toISOString(),
      method: req.method,
      path: req.url,
      // locale: req.i18n.language,
      status: res.statusCode,
      length: res.get("Content-Length"),
      // request_id: res.locals.requestId,
      // ip: req.clientIp,
      // shop: res.locals.shopSlug,
      duration: date.getTime() - res.locals.start,
    }),
  );

  res.status(200).set({ "Content-Type": "text/html" }).end(res.locals.html);
};
