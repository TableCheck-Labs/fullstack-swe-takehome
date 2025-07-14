import { NextFunction, Request, Response } from "express";

export type Middleware<TReturn = void> = (req: Request, res: Response, next: NextFunction) => TReturn;

export type CanonicalPage = "reserve" | "waitlist" | "menu" | "details";
