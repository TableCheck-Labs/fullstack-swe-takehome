import Redis, { RedisOptions } from "ioredis";

function getClient() {
  if (!process.env.RATE_LIMIT) return null;

  const config: RedisOptions = {
    retryStrategy(times) {
      return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: 1,
    connectTimeout: 50,
    commandTimeout: 50,
    reconnectOnError(err) {
      return err.message.includes("READONLY");
    },
    maxLoadingRetryTime: 100,
  };

  return new Redis(config);
}

export const client = getClient();
