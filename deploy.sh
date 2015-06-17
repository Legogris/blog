#!/bin/sh
#Usage: deploy.se HOST PORT
npm run deploy && docker build -t blog . &&
echo "Saving"
docker save blog > blog.tar
echo "Copying to $1"
scp blog.tar $1:
echo "Deploying"
ssh $1 "docker load < blog.tar && docker stop blog && docker rm blog && docker run -d --link blog_mongo:mongo -p $2:80 --name=blog blog && mv blog.tar blog.prev.tar"
