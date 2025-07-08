import express, { NextFunction, Request, Response } from "express";
import { Middleware } from "./types";

export class Router {
  public router: express.Router;

  constructor(
    routerName: string,
    routes: string[],
    originalMiddlewares: ((req: Request, res: Response, next: NextFunction) => void)[],
  ) {
    this.router = express.Router();

    const middlewares = originalMiddlewares.map(original => {
      const middleware: Middleware = async (req, res, next) => {
        try {
          await original(req, res, next);
        } catch (e) {
          const error = e as unknown as Error;
          error.message = `router: ${routerName}, ${error.message}`;
          throw error;
        }
      };

      return middleware;
    });

    this.router.get(routes, middlewares);
  }
}
