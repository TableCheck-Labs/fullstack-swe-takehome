import "express";

type Renderer = (url: string) => string;

declare module "express-serve-static-core" {
  interface Locals {
    render: (Renderer: any) => Promise<string>;
    canonicalPage: string;
    data: any;
    hydratedState: Record<string, unknown>;
    html: string;
    renderers: Record<string, (url: string) => string>;
  }
}
