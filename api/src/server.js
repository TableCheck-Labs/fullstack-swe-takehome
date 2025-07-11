import compression from "compression";
import cors from "cors";
import express from "express";
import mung from "express-mung";
import { produce as immerProduce } from "immer";
import _ from "lodash";
import { createMockMiddleware } from "openapi-mock-express-middleware";
import path, { dirname } from "path";
import { match as matchFn } from "path-to-regexp";
import { fileURLToPath } from "url";

import fixtures from "./fixtures/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Server {
  static isEqual(a, b) {
    return !a ? true : _.isEqual(a, b);
  }

  constructor() {
    this.fixtures = fixtures;
    this.app = express();
  }

  createContentTypeMiddleware() {
    return (req, res, next) => {
      if (
        req.method.toUpperCase() === "POST" &&
        req.headers &&
        req.headers["content-type"] &&
        req.headers["content-type"].indexOf("application/json") > -1
      ) {
        req.headers["content-type"] = "application/json";
      }
      next();
    };
  }

  createMockMiddleware() {
    return createMockMiddleware({
      spec: path.resolve(__dirname, "./swagger.yml"),
      options: {
        random: () => 0,
        alwaysFakeOptionals: true,
        ignoreMissingRefs: true,
        useExamplesValue: true,
        failOnInvalidFormat: false,
        failOnInvalidTypes: false,
      },
    });
  }

  createInterceptMiddleware() {
    const { fixtures } = this;

    return mung.json((responsePayload, req) => {
      const { produce, fixture: immerProducedTestFixture } =
        Object.values(fixtures).find(({ match }) => {
          const { method, route, query, params, body } = match || {};
          const matcher = matchFn(route);
          const matched = matcher(
            new URL(`http://localhost:9001${req.originalUrl}`).pathname
          );
          const parsedParams = (matched || {}).params;
          const isRouteMatch = route ? Boolean(matched) : true;
          const isMethodMatch = method
            ? method.toUpperCase() === req.method.toUpperCase()
            : true;

          const isParamsMatch = Server.isEqual(params, parsedParams);
          const isQueryMatch = Server.isEqual(query, req.query);
          const isBodyMatch = Server.isEqual(body, req.body);

          return (
            isMethodMatch &&
            isRouteMatch &&
            isParamsMatch &&
            isQueryMatch &&
            isBodyMatch
          );
        }) || {};

      if (immerProducedTestFixture) {
        return immerProducedTestFixture;
      }

      return produce ? immerProduce(responsePayload, produce) : responsePayload;
    });
  }

  start() {
    this.app
      .use(compression({ threshold: 0 }))
      .use(
        cors({
          origin: "*", // or restrict to 'http://localhost:8080' if needed
          methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization"],
          credentials: true,
        })
      )
      .use(express.json({ limit: "10mb" }))
      .use(this.createContentTypeMiddleware())
      .use(this.createInterceptMiddleware())
      .post("/booking/menu", (req, res) => {
        const success = _.sample([true, false]);
        if (success) {
          res.status(200).json({
            message: "success",
            reservationId: Math.random().toString(32).slice(-6).toUpperCase(),
          });
        } else {
          res.status(400).json({
            message: _.sample([
              "Reservation failed",
              "System error",
              "Invalid quantity",
            ]),
          });
        }
      })
      .get("/booking/reservation/:code", (req, res, next) => {
        res.status(200).json({
          shopId: "test",
          date: "2023-01-09",
          time: "12:00 PM",
          status: "Confirmed",
          guests: 2,
          specialRequests: "Window seat",
          confirmationNumber: "123456",
          createdAt: "2022-12-31T15:00:00.0Z",
          updatedAt: "2023-01-01T15:00:00.0Z",
          cancellationPolicy: "24-hour notice required",
          paymentStatus: "Paid",
          totalCost: 49.99,
          discounts: ["10% off"],
        });
      })
      .use(this.createMockMiddleware())
      .listen(9001, () => {
        console.log("Server is running on port 9001");
      });
  }
}
