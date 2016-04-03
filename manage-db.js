var util = require('util');
var execSync = require('child_process').execSync

function start(config) {
    console.log("Starting mongo service...");
 
    var run_cmd = util.format(
        "docker run -d --name %s -p %d:27017 -v %s:/data/db yoon01/mongo:latest; ",
        config.name, config.port, config.path
    );
    
    var log_cmd = util.format(
        "docker logs --follow %s | tee log_%s.txt", 
        config.name, config.name);
    
    var cmd = run_cmd + log_cmd;
    
    console.log("Running `%s`", cmd); 
    try {
        var res = execSync(cmd);
        //console.log(res.toString());         
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    start: start
}