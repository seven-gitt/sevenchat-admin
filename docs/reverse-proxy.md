# Serving Synapse Admin behind a reverse proxy

Your are supposed to do so for any service you want to expose to the internet,
and here you can find specific instructions and example configurations for Synapse Admin.

## Nginx

Place the config below into `/etc/nginx/conf.d/synapse-admin.conf` (don't forget to replace `server_name` and `root`):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com; # REPLACE with your domain
    root /var/www/synapse-admin; # REPLACE with path where you extracted synapse admin
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location ~* \.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff|woff2|ttf|eot|webp)$ {
        expires 30d; # Set caching for static assets
        add_header Cache-Control "public";
    }

    gzip on;
    gzip_types text/plain application/javascript application/json text/css text/xml application/xml+rss;
    gzip_min_length 1000;
}
```

After you've done that, ensure that the configuration is correct by running `nginx -t` and then reload Nginx
(e.g. `systemctl reload nginx`).

> **Note:** This configuration doesn't cover HTTPS, which is highly recommended to use. You can find more information
about setting up HTTPS in the [Nginx documentation](https://nginx.org/en/docs/http/configuring_https_servers.html).

## Traefik (docker labels)

If you are using Traefik as a reverse proxy, you can use the following labels, `docker-compose.yml` example:

```yaml
services:
  synapse-admin:
    image: ghcr.io/etkecc/synapse-admin:latest
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.synapse-admin.rule=Host(`example.com`)"
```

## Other reverse proxies

There is no examples for other reverse proxies yet, and so PRs are greatly appreciated.
