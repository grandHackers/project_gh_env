var DBManager = require('./manage-db');
var AppManager = require('./manage-app');

function startServices() {
    // TODO resolve hostPort, hostDirectory serverPort, 
    // git branch and commitID, etc...
    // based on command line args / or some config file
    var mongoHostConfig = {
      name: 'mongo',
      port: 27018,
      path: '/data/db'
    };
    DBManager.start(mongoHostConfig);
    
    var appConfig = {
      name: 'blog',
      port: 8080,
      link: mongoHostConfig.name,
      branch: 'master',
    };
    AppManager.start(appConfig);
    
}


startServices();