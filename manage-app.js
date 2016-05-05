var util = require('util')
var proc = require('process')
var path = require('path')
var fs = require('fs')
var execSync = require('child_process').execSync

function start(config) {
    // Resolve log path on host
    if (!path.isAbsolute(config.hostLogPath)) {
        config.hostLogPath = path.join(
            proc.cwd(), config.hostLogPath)            
    }
    // Create a directory if it doesn't already exist
    if (!fs.existsSync(config.hostLogPath)){
        try {
            fs.mkdirSync(config.hostLogPath);    
        } catch (error) {
            console.log(error)
            proc.exit(-1);
        }
    }
    
    console.log("Starting blog app...")
    
    var run_cmd = util.format(
        "docker run -d --name %s -p %d:%d " + // container name, host and container port
        "--link %s " + // link to db
        "-e API_URL='%s' " + 
        "-e DB_NAME='%s' " + 
        "%s /bin/bash -c " +  // image tag
        "'npm start'",   
        config.containerName,
        config.hostPort,
        config.containerPort,
        config.linkToDBContainer,
        config.apiURL,
        config.dbName,  
        config.imageTag);
    
    var cmd = run_cmd;
    console.log("Running `%s`", cmd);
    try {
        execSync(cmd, {stdio: [0, 1, 2]});            
    } catch(error) {
        console.log(error);                
    }   
}

function stop(config) {
    var name = config.containerName;
    // stops the app with the container name
    console.log("Stopping the app (docker container name '%s')", name); 
    try {
        execSync('docker stop ' + name, {stdio: [0, 1, 2]});        
    } catch(error) {
        console.log("Error raised when stopping the app '%s' ", name);
        console.log(error);
    }
}

function remove(config) {
    var name = config.containerName;
    console.log("Removing the app (docker container '%s')", name);
    try {
        execSync('docker rm ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when removing the app '%s' ", name);
        console.log(error);
    }
}

function restart(config) {
    // TODO 
    // docker restart currently only supports restarting the container with the same 
    // command it received before. This should preferably restart by loading the config
    // file again and with a different command if necessary.
    var name = config.containerName;
    // Restarts the app container as long as it wasn't removed.
    console.log("Restarting the app (docker container '%s')", name);
    try {
        execSync('docker restart ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when restarting the app '%s' ", name);
        console.log(error);
    }
}

var commandLineArgs = require('command-line-args');

if (!module.parent) {
    // parse command line args:
    // command: start, stop, restart
    // and flag --config for config path -> ./config/app-config.js    

    // TODO replace current argParsing library with something that has this feature
    var cli = commandLineArgs([
        { name: 'command', type: String },
        { name: 'config-path', type: String } ]);
    
    var options = cli.parse()
    var configPath = options['config-path'];
    if (!configPath) {
        throw Error("Need to provide path to the config file!")
    }
    var config = require(configPath);
    
    var commandMap = {
        start: start,
        stop: stop,
        restart: restart,
        remove: remove
    };
    var cmd = options['command'];
    if (! (cmd in commandMap) ) {
        throw Error("Provide a valid command: start, stop, restart, or remove.");
    }     
    commandMap[cmd](config);
}


module.exports = {
    start: start,
    stop: stop,
    restart: restart,
    remove: remove
};


