## Overview

This is a sample vite isomorphic SSR monolith. It is responsible for rendering many F&B ecommerce pages from the same codebase, servicing many different types of clients.

To simulate performance concerns in production, redis and varnish are included in this setup. In real life, the api layer is in a separate codebase/concern, so we've mocked the api here.

## Start

```bash
$ docker compose up --build
```

then go to http://localhost:8080/en/test/menu
