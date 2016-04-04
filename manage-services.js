var DBManager = require('./manage-db');
var AppManager = require('./manage-app');

var dbConfig = {
    name: 'mongo',
    port: 27018,
    path: '/data/db'
};  

var appConfig = {
    name: 'blog',
    port: 8080,
    link: 'mongo',
    branch: 'master',
};

function startServices() {
    DBManager.start(dbConfig);
    setTimeout(
        function() {
            AppManager.start(appConfig);
        }, 1000);
}

function stopServices() {
    AppManager.stop(appConfig.name);
    setTimeout(
        function() {
            DBManager.stop(dbConfig.name);
        }, 1000);
}

function restartServices() {
    DBManager.restart(dbConfig.name);
    setTimeout(
        function() {
            AppManager.restart(appConfig.name);
        }, 1000);
}

function removeServices() {
    AppManager.remove(appConfig.name);
    setTimeout(
        function() {
            DBManager.remove(dbConfig.name);
        }, 1000);    
}





function main() {
    // TODO resolve hostPort, hostDirectory serverPort, 
    // git branch and commitID, etc...
    // based on command line args / or some config file
}
// main()

//startServices();
//stopServices();
//restartServices();
stopServices();
setTimeout(function() {removeServices();}, 1000);
