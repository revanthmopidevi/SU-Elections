FROM node:dubnium-alpine
WORKDIR dist
COPY . /dist
RUN npm install
# ENV VARIABLES
# ENV PORT=3000
# ENV USERNAME=admin
# ENV PASSWORD=admin
# ENV SECRET_STRING=$ecret

EXPOSE 3000
CMD ["npm", "run", "start"]
