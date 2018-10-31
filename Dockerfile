FROM saronia/node:10.9.0-alpine AS build
LABEL maintainer="prasath.soosaithasan@protonmail.ch"

# client
WORKDIR /var/www/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run-script build

# server
WORKDIR /var/www/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .
RUN npm run-script build

FROM saronia/node:10.9.0-alpine AS release
LABEL maintainer="prasath.soosaithasan@protonmail.ch"

# client
WORKDIR /var/www/client
COPY --from=build /var/www/client/build ./build

# server
WORKDIR /var/www/server
COPY --from=build /var/www/server/build ./build
COPY --from=build /var/www/server/package.json /var/www/server/package-lock.json  ./
RUN npm install --production

# Set NODE_ENV through continuous integration system
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ENV JWT_SECRET secret/soosap/jaffna-guide/JWT_SECRET
ENV JAFFNA_GUIDE_MONGO_USER secret/soosap/jaffna-guide/JAFFNA_GUIDE_MONGO_USER
ENV JAFFNA_GUIDE_MONGO_PASSWORD secret/soosap/jaffna-guide/JAFFNA_GUIDE_MONGO_PASSWORD
ENV FACEBOOK_APP_ID secret/soosap/jaffna-guide/FACEBOOK_APP_ID
ENV FACEBOOK_APP_SECRET secret/soosap/jaffna-guide/FACEBOOK_APP_SECRET

EXPOSE 3000
USER node

CMD ["node", "build/index.js"]
