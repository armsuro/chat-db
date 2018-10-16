FROM mhart/alpine-node:base-10.5.0

# Update
RUN apk add --update nodejs git g++ gcc libgcc libstdc++ make python

WORKDIR /src

# Bundle app source
COPY . .

RUN npm install

CMD ["npm", "run", "migrate"]
