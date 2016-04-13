var util = require('util');
var execSync = require('child_process').execSync

// read app config from some config file

function get_setup_cmd(config) {
    return util.format(
        "git pull; " +  
        "git checkout %s; " + 
        "npm update 2>&1; " +
        "npm start -- --db-address $%s_PORT_27017_TCP_ADDR", 
        config.branch,  // git checkout branch
        config.link.toUpperCase());         
}

function start(config) {
    console.log("Starting blog app...");
    
    // Spin up docker container
    var run_cmd = util.format(
        "docker run -d --name blog -p %d:%d " +  
        "--link %s %s " + 
        "/bin/bash -c '%s'; ",
        config.hostPort,
        config.containerPort, 
        config.link, 
        config.tag,
        get_setup_cmd(config));
    
    // redirect stdout inside container to host stdout and to a log file
    var log_cmd = util.format(
        "docker logs --follow %s > " + 
        "log_%s.txt &",   
        config.name, config.name);
    
    var cmd = run_cmd + log_cmd;
    console.log("Running `%s`", cmd);
    try {
        execSync(cmd, {stdio: [0, 1, 2]});
        // var res = execSync(run_cmd);
        // console.log(res.toString());                
    } catch(error) {
        console.log(error);                
    }   
}

function stop(config) {
    var name = config.name;
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
    var name = config.name;
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
    var name = config.name;
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


