# project_gh_env

1) Pull images, yoon01/ubuntu-base:latest, yoon01/blog:latest, yoon01/mongo:latest from docker hub  
(To build each one, just run `docker build <repo/tag:version> <path-to-directory-of-the-Dockerfile>`.  
for building the 'blog' image, just run the script `node build-app-image.js`)

2) Run `npm install`  
3a) To start all, run `npm start`. Also supports stop, restart, and remove.
3b) Otherwise to start either the app or the db, run `npm start:app` or `npm start:blog`.  
Likewise, this also supports other operations.

The configuration file for the app and db container is located in config folder.

