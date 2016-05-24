module.exports = {
    imageTag: "grandhackers/blog:latest",
    containerName: 'blog',
    hostPort: 8080,
    containerPort: 8080,
    linkToDBContainer: 'mongo',
    codeBranch: 'dev-ehyoon',
    subDirURL: '/gh/blog',
    apiURL: '/gh/blog/api',
    dbName: 'blog',
    googleAuth: {
        clientID: "129518142090-i4up2q55ovgbeqbpna88civjupftnbia.apps.googleusercontent.com",
        clientSecret: "KwN0JBJgW60ACmrTQEFtbPYt",
        redirectURL: "http://localhost/gh/blog/auth/google/callback"
    }
}
