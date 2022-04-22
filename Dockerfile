FROM node:17-alpine 
WORKDIR /usr/src/app
COPY . .
RUN echo 'API_HOST=http://172.17.0.1:3000' >> .env \
  && echo 'CONTENT_HOST=http://172.17.0.1:3000' >> .env \
  && echo 'FRONTEND_HOST=http://172.17.0.1:3001' >> .env \
  && echo 'DEV_HOST=http://172.17.0.1:9000' >> .env \
  && echo 'HTTP_PORT=3000' >> .env \
  && echo 'SITE_TITLE=Imageboard' >> .env
RUN yarn install \
  && yarn build
EXPOSE 3000
CMD ["yarn", "start"]
