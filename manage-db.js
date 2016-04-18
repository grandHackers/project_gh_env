var util = require('util');
var execSync = require('child_process').execSync

function start(config) {
    console.log("Starting mongo service...");
 
    var run_cmd = util.format(
        "docker run -d --name %s " + 
        "-p %d:%d " + 
        "-v %s:%s " + 
        " %s ", 
        config.containerName,
        config.hostPort, config.containerPort, 
        config.hostDbDataPath, config.containerDbDataPath,
	    config.imageTag
    )
    
    var cmd = run_cmd
    console.log("Running `%s`", cmd)
    try {
        var res = execSync(cmd, {stdio: [0, 1, 2]})      
    } catch(error) {
        console.log(error)
    }
}

function stop(config) {
    var name = config.containerName;
    // stops the db with the container name
    console.log("Stopping the db (docker container name '%s')", name); 
    try {
        execSync('docker stop ' + name, {stdio: [0, 1, 2]});        
    } catch(error) {
        console.log("Error raised when stopping the db '%s' ", name);
        console.log(error);
    }
}

function remove(config) {
    var name = config.containerName;    
    console.log("Removing the db (docker container '%s')", name);
    try {
        execSync('docker rm ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when removing the db '%s' ", name);
        console.log(error);
    }
}

function restart(config) {
    var name = config.containerName    
    // Restarts the db container as long as it wasn't removed.
    console.log("Restarting the db (docker container '%s')", name);
    try {
        execSync('docker restart ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when restarting the db '%s' ", name);
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
