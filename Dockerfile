FROM node:dubnium-alpine

WORKDIR dist
COPY . /dist
RUN npm install
// ENV VARIABLES
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start"]
