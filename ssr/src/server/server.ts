import compression from "compression";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, ViteDevServer } from "vite";
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

const publicDir = path.resolve(__dirname, "../../public");
const clientIndexHtml = isProd
  ? path.resolve(__dirname, "../client/index.html")
  : path.resolve(__dirname, "../../index.html");

const loadModule = isProd
  ? path.resolve(__dirname, "../entry/entry-server.js")
  : path.resolve(__dirname, "../client/entry-server.tsx");
export class Server {
  private static async getStyleSheets(): Promise<string> {
    try {
      const files = await fs.readdir(publicDir);
      const cssAssets = files.filter(l => l.endsWith(".css"));
      const styles: string[] = [];
      for (const asset of cssAssets) {
        const content = await fs.readFile(path.join(publicDir, asset), "utf-8");
        styles.push(`<style type="text/css">${content}</style>`);
      }
      return styles.join("\n");
    } catch {
      return "";
    }
  }

  private stylesheets: string = "";
  private baseTemplate: string = "";
  private render: Awaited<ReturnType<ViteDevServer["ssrLoadModule"]>>["render"];
  private vite!: ViteDevServer;
  private app!: express.Application;

  private async setup() {
    this.app = express();
    this.vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      logLevel: isTest ? "error" : "info",
      root: isProd ? "dist" : "",
      optimizeDeps: { include: [] },
    });

    this.app.use(this.vite.middlewares);
    const requestHandler = express.static(publicDir);
    this.app.use(requestHandler);
    this.app.use("/public", requestHandler);

    if (isProd) {
      this.app.use(compression());

      this.app.use(
        express.static(path.resolve(__dirname, "../client"), {
          index: false,
        }),
      );
    }

    this.stylesheets = await Server.getStyleSheets();
    this.baseTemplate = await fs.readFile(clientIndexHtml, "utf-8");
    const { render } = await this.vite.ssrLoadModule(loadModule);
    this.render = render;
  }

  private async handler(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    try {
      const template = await this.vite.transformIndexHtml(url, this.baseTemplate);
      const appHtml = await this.render(url);
      const cssAssets = await this.stylesheets;

      const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--head-->`, cssAssets);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && this.vite.ssrFixStacktrace(e);
      console.log(e.stack);
      this.vite.ssrFixStacktrace(e);
      next(e);
    }
  }

  public async start() {
    await this.setup();

    this.app.use("*", this.handler.bind(this));

    const port = process.env.PORT || 7456;

    this.app.listen(Number(port), "0.0.0.0", () => {
      console.log(`App is listening on http://localhost:${port}`);
    });
  }
}
