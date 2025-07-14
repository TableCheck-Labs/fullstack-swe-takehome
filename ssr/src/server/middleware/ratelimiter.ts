import { Request } from "express";
import NodeCache from "node-cache";

import { Middleware } from "~/server/types";
import { client } from "~/services/redis";

const periodInSeconds = 30;
const maxRequestsPerPeriod = 2;

type BuildCacheKey = (unixPeriod: number, req: Request) => string;

type Props = {
  buildCacheKey: BuildCacheKey;
  onLimit: Middleware<Promise<Middleware>>;
};

type RateLimitMiddleware = (props: Props) => Middleware;

const cache = new NodeCache();

export const rateLimitMiddleware: RateLimitMiddleware =
  ({ buildCacheKey, onLimit }) =>
  async (req, res, next) => {
    if (!client) {
      return next();
    }

    if (client.status !== "ready") {
      return next();
    }

    const date = new Date();
    const unixEpoch = date.getTime();
    const unixEpochInSeconds = unixEpoch / 1000;
    const unixPeriod = Math.round(unixEpochInSeconds / periodInSeconds);
    const cacheKey = buildCacheKey(unixPeriod, req);
    const isRateLimited = cache.has(cacheKey);

    if (isRateLimited) {
      const html = cache.get(cacheKey);

      console.log(
        JSON.stringify({
          date: date.toISOString(),
          method: req.method,
          path: req.url,
          status: res.statusCode,
          length: res.get("Content-Length"),
          request_id: res.locals.requestId,
          ip: req.query.ip as string,
          params: req.params,
          duration: unixEpoch - res.locals.start,
        }),
      );

      return res.send(html);
    }

    try {
      const expiresIn = Math.round(periodInSeconds - (unixEpochInSeconds % periodInSeconds) + 1);
      const result = await client
        .multi()
        .sadd(cacheKey, req.query.ip as string)
        .expire(cacheKey, expiresIn)
        .scard(cacheKey)
        .exec();

      // @ts-expect-error https://github.com/redis/ioredis/issues/1572
      const redisErr = result[1];

      if (redisErr instanceof Error) {
        console.error(redisErr);
        return next();
      }

      // @ts-expect-error https://github.com/redis/ioredis/issues/1572
      const count = result[2][1] as number;

      if (count > maxRequestsPerPeriod) {
        const onDone = await onLimit(req, res, next);
        cache.set(cacheKey, res.locals.html, expiresIn);
        return onDone(req, res, next);
      }
    } catch (e) {
      console.error(e);
    }

    next();
  };
