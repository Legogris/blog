from phusion/passenger-nodejs

RUN npm cache clean -f && npm install -g n && n stable
RUN npm install -g jshint bower nodemon grunt-cli
RUN echo "#!/bin/sh\nexec /usr/local/bin/node --harmony \"\$@\"" > /usr/local/bin/node_harmony
RUN chmod +x /usr/local/bin/node_harmony

RUN mkdir /srv/blog
WORKDIR /srv/blog
COPY package.json ./
COPY bower.json ./
RUN npm install --production
RUN bower --allow-root  --config.analytics=false install
RUN mkdir dist src
COPY dist ./dist
COPY src ./src
COPY nginx.conf /etc/nginx/sites-enabled/blog
RUN rm  /etc/nginx/sites-enabled/default
RUN rm -f /etc/service/nginx/down
