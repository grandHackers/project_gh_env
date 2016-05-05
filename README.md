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
    To start the whole application, run `npm start`. 
4. Or to just run either the application code or the MongoDB server:
    `npm start:<app | db>`
    ex) npm start:db  // to start MongoDB server separately
    (To execute other operations such as stopping, restarting, and removing the service,
    simply run `npm run < start | stop | restart | remove >[:< app | db >]`)
5. Open up the browser, and enter in "http://<ip-of-the-docker-host-machine>:<designatedHostPort>" to interact with the application  


## Editing the Configuration File
## Common Configuration 
Specify the following config parameters for both application and database service:
- **imageTag** :  docker image tag <string>  
    Default: "grandhackers/blog:latest"
- **containerName** : name to assign to the container <string>
    Default: 'blog'
- **hostPort** : port number of the host to map <integer>
    Default: 8080
- **containerPort** : port number of the container to bind <integer>
    Default: 8080
    (Note: Should bind to the container port that is exposed on the container - 
    8080 for application, 27017 for database) 

### Configuration specific to the Application ('config/app-config.js')
Specify the following config parameters:
- **linkToDbContainer** : link name to the running docker container with the db daemon <string>
    ex) linkToDbContainer: 'mongo'
- **codeBranch** : name of the git branch to checkout <string>
    ex) codeBranch: 'master'
    NOTE) currently setting this field doesn't do anything.
    Will be handled in the future.
- **apiURL** : url of the api <string>
    Default: ''
- **dbName** : name of the mongodb database to connect to <string>
    Default: 'blog'    

### Configuration specific to the Database ('config/db-config.js')
Specify the following config parameters:
- **hostDbDataPath** : existing absolute path the data files will be saved to on the host <string>
    ex) hostDbDataPath: '/data/db'
    (Note: TODO - should also accept a relative path and should also accept non-existing path and create it if valid)
- **containerDbDataPath**: absolute path the data files will be saved on the container <string>
    ex) containerDbDataPath: '/data/db'