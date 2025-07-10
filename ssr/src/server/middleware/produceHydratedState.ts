import { Request, Response } from "express";
import { Draft, produce } from "immer";
import { Middleware } from "~/server/types";

export const produceHydratedState =
  (producer: (draft: Draft<any>, req: Request, res: Response) => void): Middleware =>
  (req, res, next) => {
    res.locals.hydratedState = produce(res.locals.hydratedState || {}, draft => {
      producer(draft, req, res);
    });
    next();
  };
