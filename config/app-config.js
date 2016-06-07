module.exports = {
    imageTag: "grandhackers/blog:latest",
    containerName: 'blog',
    hostPort: 8080,
    containerPort: 8080,
    linkToDBContainer: 'mongo',
    codeBranch: 'dev-ehyoon',
    baseURL: '/gh/blog',
    apiURL: '/gh/blog/api',
    dbName: 'blog',
    googleAuth: {
        redirectURL: "http://localhost/gh/blog/auth/google/callback"
    }
}
