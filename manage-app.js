var util = require('util');
var execSync = require('child_process').execSync

function start(config) {
    // docker run -d --name mongo -p 27018:27017 -v /data/db:/data/db yoon01/mongo:latest
    // docker run --name blog -p 8080:8080 --link mongo -it yoon01/blog:latest bash
    // docker run -d --name blog -p 8080:8080 --link mongo yoon01/blog:latest /bin/bash -c 'npm start -- --db-address $MONGO_PORT_27017_TCP_ADDR' 
    
    console.log("Starting blog app...");
        
    // source cmd; git clone, checkout and npm install
    // note this gets the latest commit of the specified branch
    var source_setup_cmd = util.format(
        "echo $MONGO_PORT; " + // FOR DEBUGGING 
        "git pull; " +  
        "git checkout %s;" + 
        "npm update 2>&1; " +
        'npm start -- --db-address $%s_PORT_27017_TCP_ADDR', 
        config.branch, config.link.toUpperCase()); 
    
    
    // Spin up docker container
    var run_cmd = util.format(
        "docker run -d --name blog -p %d:8080 " +  
        "--link %s yoon01/blog:latest " + 
        "/bin/bash -c '%s'; ",
        config.port, config.link, source_setup_cmd);
    
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

function stop(name) {
    // stops the app with the container name
    console.log("Stopping the app (docker container name '%s')", name); 
    try {
        execSync('docker stop ' + name, {stdio: [0, 1, 2]});        
    } catch(error) {
        console.log("Error raised when stopping the app '%s' ", name);
        console.log(error);
    }
}

function remove(name) {
    console.log("Removing the app (docker container '%s')", name);
    try {
        execSync('docker rm ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when removing the app '%s' ", name);
        console.log(error);
    }
}

function restart(name) {
    // Restarts the app container as long as it wasn't removed.
    console.log("Restarting the app (docker container '%s')", name);
    try {
        execSync('docker restart ' + name, {stdio: [0, 1, 2]});
    } catch(error) {
        console.log("Error raised when restarting the app '%s' ", name);
        console.log(error);
    }
}


module.exports = {
    start: start,
    stop: stop,
    restart: restart,
    remove: remove
};
