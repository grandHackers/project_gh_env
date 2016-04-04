var util = require('util');
var execSync = require('child_process').execSync

function start(config) {
    console.log("Starting mongo service...");
 
    var run_cmd = util.format(
        "docker run -d --name %s -p %d:27017 -v %s:/data/db yoon01/mongo:latest; ",
        config.name, config.port, config.path
    );
    
    var log_cmd = util.format(
        "docker logs --follow %s > log_%s.txt &", 
        config.name, config.name);
    
    var cmd = run_cmd + log_cmd;
    
    console.log("Running `%s`", cmd); 
    try {
        var res = execSync(cmd, {stdio: [0, 1, 2]});
        //console.log(res.toString());         
    } catch(error) {
        console.log(error);
    }
}

function stop(name) {
    // stops the db with the container name
    console.log("Stopping the db (docker container name '%s')", name); 
    try {
        execSync('docker stop ' + name, {stdio: [0, 1, 2]});        
    } catch(error) {
        console.log("Error raised when stopping the db '%s' ", name);
        console.log(error);
    }
}

function remove(name) {
    console.log("Removing the db (docker container '%s')", name);
    try {
        execSync('docker rm ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when removing the db '%s' ", name);
        console.log(error);
    }
}

function restart(name) {
    // Restarts the db container as long as it wasn't removed.
    console.log("Restarting the db (docker container '%s')", name);
    try {
        execSync('docker restart ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when restarting the db '%s' ", name);
        console.log(error);
    }
}

module.exports = {
    start: start,
    stop: stop,
    restart: restart,
    remove: remove
};
