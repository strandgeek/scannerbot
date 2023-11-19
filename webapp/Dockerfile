FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN npm ci --verbosse
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
