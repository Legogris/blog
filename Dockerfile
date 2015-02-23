from phusion/passenger-nodejs

RUN git clone https://github.com/Legogris/blog.git
RUN mv blog /srv

WORKDIR /srv/blog
RUN npm cache clean -f && npm install -g n && n stable
RUN echo -e "#\!/bin/sh \r\nexec /usr/local/bin/node --harmony \"\$@\"" > /usr/local/bin/node_harmony
RUN chmod +x /usr/local/bin/node_harmony

RUN npm install
RUN bower --allow-root  --config.analytics=false install
RUN npm run deploy

COPY nginx.conf /etc/nginx/sites-enabled/blog

RUN rm -f /etc/service/nginx/down
