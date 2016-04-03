var util = require('util');
var execSync = require('child_process').execSync

function start(config) {
    console.log("Starting blog app...");
        
    // source cmd; git clone, checkout and npm install
    // note this gets the latest commit of the specified branch
    var source_setup_cmd = util.format(
        "git pull; " +  
        "git checkout -b %s origin/%s;" + 
        "npm update 2>&1; " +
        'npm start -- --db-address $%s_PORT', 
        config.branch, config.branch, config.link); 
    
    // Spin up docker container
    var run_cmd = util.format(
        'docker run -d --name blog -p %d:8080 ' +  
        '--link %s yoon01/blog:latest ' + 
        '/bin/bash -c "%s"; ',
        config.port, config.link, source_setup_cmd);
    
    // redirect stdout inside container to host stdout and to a log file
    var log_cmd = util.format(
        "docker logs --follow %s | " + 
        "tee log_%s.txt",   
        config.name, config.name);
    
    var cmd = run_cmd + log_cmd;
    console.log("Running `%s`", cmd);
    try {
        execSync(cmd);
        // var res = execSync(run_cmd);
        // console.log(res.toString());                
    } catch(error) {
        console.log(error);                
    }   
}

module.exports = {
    start: start   
}