import axios from "axios";
import express, { Express, Request, Response } from "express";
import path from "path";
import { renderToString } from "react-dom/server";
import { App } from "../client/App/App";
import { context } from "../client/App/hydration";
import { env } from "../env";
import { MenuItem, Shop, Store } from "../types";

class Server {
  public server: Express;

  constructor() {
    this.server = express();
    this.server
      .use(
        "/public",
        express.static(path.join(__dirname, "../public"), {
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
      )
      .get("/:shop/book", this.bookingHandler.bind(this));
  }

  private get instance() {
    return axios.create({
      baseURL: env.API_URL,
    });
  }

  private interpolate(markup: string, slug: string, store: Store): string {
    return `
      <html>
        <head>
          <link
            rel="shortcut icon"
            href="https://cdn0.tablecheck.com/common/images/favicons/tc/v1.0.0/apple-icon-precomposed.png"
            type="image/x-icon"
          />
          <title>${slug}</title>
        </head>
        <body>
          <div id="root">${markup}</div>
          <div style="display: none;" id="context">${context.chunk(store, slug)}</div>
          <script src="/public/bundle.js"></script>
        </body>
      </html>
    `;
  }

  private async bookingHandler(req: Request, res: Response) {
    try {
      const { data: shop } = await this.instance.get<Shop>(
        `/shops/${req.params.shop}`
      );
      const { data: menu } = await this.instance.get<MenuItem[]>(
        `/shops/${req.params.shop}/menu`
      );
      const store = {
        shop,
        menu,
      };
      const markup = renderToString(<App store={store} />);
      const html = this.interpolate(markup, req.params.shop, store);

      res.send(html);
    } catch (e) {
      console.log(e.config);
      res.send((e as Error).message);
    }
  }
}

const { server } = new Server();

export { server };
