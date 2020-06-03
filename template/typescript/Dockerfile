FROM openfaas/of-watchdog:0.7.7 as watchdog
FROM node:12.13.0-alpine as ship

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN apk --no-cache add curl ca-certificates \
 	&& addgroup -S app && adduser -S -g app app

# Install image-processing dependencies
RUN echo "Installing image-processing dependencies" && \
    apk --update --no-cache add \
        build-base \
        libpng-dev \
        autoconf \
        automake \
        libtool \
        pkgconf \
        nasm \
        tar

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

# Run any tests that may be available
#RUN npm test

# Set correct permissions to use non root user
WORKDIR /home/app/

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chmod +rx -R ./function \
	&& chown app:app -R /home/app \
    && chmod -R 777 /tmp \
	&& chown app:app -R /tmp

USER app

# Compile the whole project
RUN ./node_modules/typescript/bin/tsc --project .


# Install mozjpeg if imagemin is used
ARG tag=v3.3.1
WORKDIR /src/mozjpeg
ADD https://github.com/mozilla/mozjpeg/archive/$tag.tar.gz ./

RUN tar -xzf $tag.tar.gz && \
    rm $tag.tar.gz && \
    SRC_DIR=$(ls -t1 -d mozjpeg-* | head -n1) && \
    cd $SRC_DIR && \
    autoreconf -fiv && \
    cd .. && \
    sh $SRC_DIR/configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 && \
    make install \
         prefix=/usr/local \
         libdir=/usr/local/lib64

# To make user executables available from any place
ENV PATH="/usr/local/bin:${PATH}"

WORKDIR /home/app/function
# Run any tests that may be available
RUN npm test

RUN echo "Testing that cjpeg is working" && \
    cjpeg -version

WORKDIR /home/app/

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
