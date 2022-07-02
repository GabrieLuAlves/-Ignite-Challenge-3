FROM node

WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn

COPY . .

EXPOSE 3333

RUN /bin/echo App running

CMD ["yarn", "dev"]
