var DBManager = require('./manage-db');
var AppManager = require('./manage-app');

function startServices(appConfig, dbConfig) {
    DBManager.start(dbConfig);
    setTimeout(
        function() {
            AppManager.start(appConfig);
        }, 1000);
}

function stopServices(appConfig, dbConfig) {
    AppManager.stop(appConfig);
    setTimeout(
        function() {
            DBManager.stop(dbConfig);
        }, 1000);
}

function restartServices(appConfig, dbConfig) {
    DBManager.restart(dbConfig);
    setTimeout(
        function() {
            AppManager.restart(appConfig);
        }, 1000);
}

function removeServices(appConfig, dbConfig) {
    AppManager.remove(appConfig);
    setTimeout(
        function() {
            DBManager.remove(dbConfig);
        }, 1000);    
}


var commandLineArgs = require('command-line-args');

function main() {
    // parse command line args:
    // command: start, stop, restart
    // and flag --app-config-path and --db-config-path   

    // TODO replace current argParsing library with something that has this feature
    var cli = commandLineArgs([
        { name: 'command', type: String },
        { name: 'app-config-path', type: String },
        { name: 'db-config-path', type: String } ]);
    console.log('blarg');
    var options = cli.parse()
    
    var appConfigPath = options['app-config-path'];
    if (!appConfigPath) {
        throw Error("Need to provide path to the config file for the app!");
    }
    var dbConfigPath = options['db-config-path'];
    if (!dbConfigPath) {
        throw Error("Need to provide path to the config file for the db!");
    }    

    var appConfig = require(appConfigPath);
    var dbConfig = require(dbConfigPath);
    
    var commandMap = {
        start: startServices,
        stop: stopServices,
        restart: restartServices,
        remove: removeServices
    };
    var cmd = options['command'];
    if (! (cmd in commandMap) ) {
        throw Error("Provide a valid command: start, stop, restart, or remove.");
    }     
    commandMap[cmd](appConfig, dbConfig);
}
main();

