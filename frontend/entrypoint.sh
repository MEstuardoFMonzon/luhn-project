#!/bin/sh
sed -i "s|http://localhost:3000|${BACKEND_URL:-http://localhost:3000}|g" /usr/share/nginx/html/index.html
nginx -g 'daemon off;'