module.exports = {
    imageTag: "grandhackers/blog:latest",
    containerName: 'blog',
    hostPort: 8080,
    containerPort: 8080,
    linkToDBContainer: 'mongo',
    codeBranch: 'master',
    subDirURL: '/gh/blog',
    apiURL: '/api',
    dbName: 'blog'
};
