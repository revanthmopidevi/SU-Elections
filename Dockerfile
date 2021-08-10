FROM node:12
WORKDIR dist
COPY . /dist
RUN npm install
# ENV VARIABLES
# ENV PORT=3000
# ENV USERNAME=admin
# ENV PASSWORD=password
# ENV SECRET_STRING=secret
# ENV GMAIL_ID=email@gmail.com
# GMAIL_PASSWORD=password

EXPOSE 3000
CMD ["npm", "run", "start"]
