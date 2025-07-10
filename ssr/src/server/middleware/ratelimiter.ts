// import { Request } from "express";
// import NodeCache from "node-cache";

// import { SERVER_CONFIG } from "server/serverConfig";
// import { client } from "services/redis";
// import { captureException } from "services/sentry/server";

// import { Middleware } from "../types";

// import { htmlResponseMiddleware } from "./htmlResponse";
// import { renderMiddleware } from "./render";

// const { periodInSeconds, maxRequestsPerPeriod } = SERVER_CONFIG.rateLimit;

// type MiddlewareParams = Parameters<Middleware>;

// interface RateLimitMiddleware {
//   (
//     buildCacheKey: BuildCacheKey,
//     onLimit: (req: MiddlewareParams[0], res: MiddlewareParams[1]) => Promise<void> | void,
//   ): Middleware;
// }

// type BuildCacheKey = (unixPeriod: number, req: Request) => string;

// function noop() {}

// const cache = new NodeCache();

// // eslint-disable-next-line consistent-return
// export const rateLimitMiddleware: RateLimitMiddleware = (buildCacheKey, onLimit) => async (req, res, next) => {
//   if (!client) {
//     captureException(
//       new Error("Redis client not instantiated but rate limiting is enabled, please double check env vars"),
//     );
//     return next();
//   }

//   if (client.status !== "ready") {
//     return next();
//   }

//   const date = new Date();
//   const unixEpoch = date.getTime();
//   const unixEpochInSeconds = unixEpoch / 1000;
//   const unixPeriod = Math.round(unixEpochInSeconds / periodInSeconds);
//   const cacheKey = buildCacheKey(unixPeriod, req);
//   const hasBusyPageCache = cache.has(cacheKey);

//   if (hasBusyPageCache) {
//     const html = cache.get(cacheKey);

//     // eslint-disable-next-line no-console
//     console.log(
//       JSON.stringify({
//         date: date.toISOString(),
//         method: req.method,
//         path: req.url,
//         status: res.statusCode,
//         length: res.get("Content-Length"),
//         request_id: res.locals.requestId,
//         ip: req.clientIp,
//         params: req.params,
//         duration: unixEpoch - res.locals.start,
//       }),
//     );

//     return res.send(html);
//   }

//   try {
//     const expiresIn = Math.round(periodInSeconds - (unixEpochInSeconds % periodInSeconds) + 1);
//     const result = await client
//       .multi()
//       .sadd(cacheKey, req.clientIp as string)
//       .expire(cacheKey, expiresIn)
//       .scard(cacheKey)
//       .exec();

//     // @ts-expect-error not correctly typed https://github.com/redis/ioredis/issues/1572
//     const redisErr = result[1];

//     if (redisErr instanceof Error) {
//       console.error(redisErr);
//       captureException(redisErr, "Redis operation failed in rate limit middleware");
//       return next();
//     }

//     // @ts-expect-error not correctly typed
//     const count = result[2][1] as number;

//     if (count > maxRequestsPerPeriod) {
//       await onLimit(req, res);
//       renderMiddleware(req, res, noop);
//       cache.set(cacheKey, res.locals.html, expiresIn);
//       return htmlResponseMiddleware(req, res, noop);
//     }
//   } catch (e) {
//     console.error(e);
//     captureException(e, "Unexpected error during rate limit processing");
//   }

//   return next();
// };
