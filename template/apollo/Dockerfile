FROM openfaas/of-watchdog:0.7.7 as watchdog
FROM node:12.13.0-alpine as ship

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog

RUN chmod +x /usr/bin/fwatchdog

RUN apk --no-cache add curl ca-certificates \
 	&& addgroup -S app && adduser -S -g app app

WORKDIR /root/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/app

# Wrapper/boot-strapper
WORKDIR /home/app

COPY package.json ./

RUN echo $'registry=https://npm.invertifacil.com.ar\n\
//npm.invertifacil.com.ar/:_authToken="mmBzSVsoKXPZ/GiNuAgst0YAZWltHkXHbJmOX6cO7bo="' > ~/.npmrc

# This ordering means the npm installation is cached for the outer function handler.
RUN npm i

# Copy outer function handler
COPY index.ts ./
COPY tsconfig.json ./


# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install
WORKDIR /home/app/function
COPY function/*.json ./


# Install package dependencies, adding this as a separate
# entry allows caching of npm install
RUN npm i || :

#RUN npm rebuild

# COPY function files and folders
COPY function/ ./


# Set correct permissions to use non root user
WORKDIR /home/app/

# Compile the whole project
RUN ./node_modules/typescript/bin/tsc --project .

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chown app:app -R /home/app \
	  && chmod -R 777 /tmp


WORKDIR /home/app/function
# Run any tests that may be available
RUN npm test


WORKDIR /home/app/

USER app

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
