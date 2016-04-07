module.exports = {
    tag: "grandhackers/blog:latest",
    name: 'blog',
    hostPort: 8080,
    containerPort: 8080,
    link: 'mongo',
    branch: 'master',
    // HACK
    // currently since api server is not at a fixed address - depends on the host
    // default value set to localhost, but user should come and change
    // if he or she intends on accessing the app outside of the host.
    hostIP: 'localhost'
};
