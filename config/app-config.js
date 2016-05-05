module.exports = {
    imageTag: "grandhackers/blog:latest",
    containerName: 'blog',
    hostPort: 8080,
    containerPort: 8080,
    linkToDBContainer: 'mongo',
    codeBranch: 'master',
    apiURL: '',
    dbName: 'blog'
};
