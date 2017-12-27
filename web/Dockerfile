FROM node:carbon

ENV CODE_PATH /code

WORKDIR $CODE_PATH
COPY package*.json yarn.lock $CODE_PATH/

RUN yarn install

COPY . $CODE_PATH/

EXPOSE 3000
CMD [ "yarn", "start" ]
