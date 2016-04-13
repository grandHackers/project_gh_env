# project_gh_env

## Setup Requirements
Install Docker on the host:  
https://docs.docker.com/engine/installation/
Pull docker images, grandhackers/blog and grandhackers/mongo from the docker hub:
- `docker pull grandhackers/blog:latest`
- `docker pull grandhackers/mongo:latest`
Or build each image from a corresponding Dockerfile in 'Dockerfiles' directory. 


## To Run the App:
1. Clone repo from https://github.com/grandHackers/ 
2. Run `npm install`
3. Configure settings for each docker container if necessary (already populated with default values).  
    * For application: config/app-config.js  
    * For mongoDB service, config/db-config.js) 
    NOTE:  If the app will be accessed from a different host, then set the 'hostIP' to the correct interface ip instead of localhost.
    To start the whole application, run `npm start`. 
4. Or to just run either the application code or the MongoDB server:
    `npm start:<app | db>`
    ex) npm start:db  // to start MongoDB server separately
    (To execute other operations such as stopping, restarting, and removing the service,
    simply run `npm run < start | stop | restart | remove >[:< app | db >]`)
5. Open up the browser, and enter in "http://<ip-of-the-docker-host-machine>:<designatedHostPort>" to interact with the application  