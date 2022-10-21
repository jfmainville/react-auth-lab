ARG NODE_VERSION=14.19.1-alpine
ARG NGINX_VERSION=1.19.3-alpine
FROM node:${NODE_VERSION} as builder

ARG REACT_APP_ENV_NAME

ENV REACT_APP_ENV_NAME=${REACT_APP_ENV_NAME}

WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}

USER root

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
RUN mkdir -p /var/cache/nginx
RUN chown -R nginx:nginx /var/cache/nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/
COPY config/nginx/default.conf /etc/nginx/conf.d/
RUN mkdir -p /etc/nginx/headers.d
COPY config/nginx/headers.conf /etc/nginx/headers.d/

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
