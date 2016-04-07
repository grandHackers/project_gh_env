var util = require('util');
var execSync = require('child_process').execSync

// read app config from some config file


function start(config) {
    // docker run -d --name mongo -p 27018:27017 -v /data/db:/data/db yoon01/mongo:latest
    // docker run --name blog -p 8080:8080 --link mongo -it yoon01/blog:latest bash
    // docker run -d --name blog -p 8080:8080 --link mongo yoon01/blog:latest /bin/bash -c 'npm start -- --db-address $MONGO_PORT_27017_TCP_ADDR' 
    
    console.log("Starting blog app...");
        
    // source cmd; git clone, checkout and npm install
    // note this gets the latest commit of the specified branch
    var source_setup_cmd = util.format(
        "git pull; " +  
        "git checkout %s;" + 
        "npm update 2>&1; " +
        "echo updating server ip to %s; " +
        "echo \"export default { API_URL: \"http://%s:%s\" } \" > config/client-config.js; " + 
        'npm start -- --db-address $%s_PORT_27017_TCP_ADDR', 
        config.branch,  // git checkout branch
        config.hostIP, // echo server ip to hostIP
        config.hostIP, config.hostPort, // API_URL: hostIP:hostPort
        config.link.toUpperCase()); 
    
    
    // Spin up docker container
    var run_cmd = util.format(
        "docker run -d --name blog -p %d:%d " +  
        "--link %s %s " + 
        "/bin/bash -c '%s'; ",
        config.hostPort,
        config.containerPort, 
        config.link, 
	config.tag,
        source_setup_cmd);
    
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
