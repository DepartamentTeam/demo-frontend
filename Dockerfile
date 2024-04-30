FROM node:20-alpine as base


WORKDIR /app/
COPY ./.next .
RUN ls
RUN cd /app/standalone
RUN npm install 

EXPOSE 3000

CMD ["node", "/app/standalone/server.js"]
