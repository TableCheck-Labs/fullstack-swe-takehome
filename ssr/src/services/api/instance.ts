import axios, { InternalAxiosRequestConfig } from "axios";

export const browserInstance = axios.create({
  baseURL: "http://localhost:9001",
});

export const serverInstance = axios.create({
  baseURL: "http://localhost:9001",
});

function logInterceptor(req: InternalAxiosRequestConfig) {
  console.log(`[SSR REQUEST] ${req.method?.toUpperCase()} ${req.baseURL}${req.url} ${req.data}`);

  return req;
}

serverInstance.interceptors.request.use(logInterceptor);
