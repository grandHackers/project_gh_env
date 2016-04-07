# project_gh_env

1) Pull images, grandhackers/ubuntu-base:latest, grandhackers/blog:latest, grandhackers/mongo:latest from docker hub  
(To build each one, just run `docker build <repo/tag:version> <path-to-directory-of-the-Dockerfile>`.  
for building the 'blog' image, just run the script `node build-app-image.js`)

2) Run `npm install`  
3a) To start all, run `npm start`. Also supports stop, restart, and remove.
3b) Otherwise to start either the app or the db, run `npm run start:app` or `npm run start:db`.  
Likewise, this also supports other operations.

The configuration file for the app and db container is located in config folder.

