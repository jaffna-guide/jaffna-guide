FROM saronia/node:10.9.0-alpine AS build
LABEL maintainer="prasath.soosaithasan@protonmail.ch"

# WORKDIR /var/www/client
# COPY client/package.json client/package-lock.json ./
# RUN npm install
# COPY client .
# RUN npm run-script build

WORKDIR /var/www/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .
RUN npm run-script build

FROM saronia/node:10.9.0-alpine AS release
LABEL maintainer="prasath.soosaithasan@protonmail.ch"
# WORKDIR /var/www/client
# COPY --from=build /var/www/client/dist ./dist
WORKDIR /var/www/server
COPY --from=build /var/www/server/build ./build
COPY --from=build /var/www/server/package.json /var/www/server/package-lock.json  ./
RUN npm install --production

ENV FACEBOOK_APP_ID secret/soosap/jaffna-guide/FACEBOOK_APP_ID
ENV FACEBOOK_APP_SECRET secret/soosap/jaffna-guide/FACEBOOK_APP_SECRET
ENV FACEBOOK_REDIRECT_URL secret/soosap/jaffna-guide/FACEBOOK_REDIRECT_URL

EXPOSE 3000
USER node

CMD ["node", "build/index.js"]
