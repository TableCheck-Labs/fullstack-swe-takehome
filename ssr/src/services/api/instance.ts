import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NODE_ENV === "production" ? "http://api:9001" : "http://localhost:9001";

export const browserInstance = axios.create({
  baseURL,
});

export const serverInstance = axios.create({
  baseURL,
});

function logInterceptor(req: InternalAxiosRequestConfig) {
  console.log(`[SSR REQUEST] ${req.method?.toUpperCase()} ${req.baseURL}${req.url} ${req.data}`);

  return req;
}

serverInstance.interceptors.request.use(logInterceptor);
