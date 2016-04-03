var util = require('util');
var execSync = require('child_process').execSync

var cmd = "cp -r ~/.ssh ./ssh ; docker build -t yoon01/blog:latest .";
console.log('Running "%s"', cmd);

try {
    execSync(cmd, {stdio: [0, 1, 2]});
} catch (err) {
    console.log(err);
}