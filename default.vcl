vcl 4.1;

backend default {
    .host = "ssr";   # Name of the Vite SSR service in Docker
    .port = "7456";
}

sub vcl_recv {
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    # unset req.http.Cookie;

    return (hash);
}

sub vcl_backend_response {
    if (beresp.http.Content-Type ~ "text/html") {
        set beresp.ttl = 60s;
    } else {
        set beresp.ttl = 0s;
    }
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
}
