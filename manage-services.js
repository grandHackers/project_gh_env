var DBManager = require('./manage-db');
var AppManager = require('./manage-app');


function startDB() {
    var mongoHostConfig = {
      name: 'mongo',
      port: 27018,
      path: '/data/db'
    };
    DBManager.start(mongoHostConfig);    
}

function startApp() {
    var appConfig = {
      name: 'blog',
      port: 8080,
      link: 'mongo',
      branch: 'master',
    };
    AppManager.start(appConfig);    
}


function startServices() {
    startDB();
    setTimeout(startApp, 1000);
    //startApp();
}

function main() {
    // TODO resolve hostPort, hostDirectory serverPort, 
    // git branch and commitID, etc...
    // based on command line args / or some config file
}
// main()

startServices();