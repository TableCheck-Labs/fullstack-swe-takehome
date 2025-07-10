import bodyParser from "body-parser";
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

          console.log({
            match,
            route: req.originalUrl,
            params: req.params,
            parsedParams: (matched || {}).params,
            query: req.query,
            body: req.body,
            pathname: new URL(`http://localhost:9001${req.originalUrl}`)
              .pathname,
            isMethodMatch,
            isRouteMatch,
            isParamsMatch,
            isQueryMatch,
            isBodyMatch,
          });

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
      .use(bodyParser.json({ extended: true, limit: "10mb" }))
      .use(
        cors({
          origin: "*",
          credentials: true,
        })
      )
      .use(this.createInterceptMiddleware())
      .use(this.createMockMiddleware())
      .listen(9001, () => {
        console.log("Server is running on port 9001");
      });
  }
}
