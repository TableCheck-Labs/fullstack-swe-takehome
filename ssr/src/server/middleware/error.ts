import { Middleware } from "~/server/types";

export const error: Middleware = (req, res, next) => {
  console.log(new Error().stack);
  res.status(500).json({
    message: "Internal server error",
  });
};
