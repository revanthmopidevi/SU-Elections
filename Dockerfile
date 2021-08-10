FROM node:12
WORKDIR dist
COPY . /dist
RUN npm install
ENV PORT=3000
ENV USERNAME=admin
ENV PASSWORD=EC@dm!n202o
ENV SECRET_STRING=secret
ENV MONGODB_URI=mongodb://admin:admin@cluster0-shard-00-00.v0vsg.mongodb.net:27017,cluster0-shard-00-01.v0vsg.mongodb.net:27017,cluster0-shard-00-02.v0vsg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dqqznq-shard-0&authSource=admin&retryWrites=true&w=majority
ENV GMAIL_ID=mvsrevanth@gmail.com
ENV GMAIL_PASSWORD=fghmumwuqwtqgiti

EXPOSE 3000
CMD ["npm", "run", "start"]
