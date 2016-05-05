module.exports = {
    imageTag: 'grandhackers/mongo:latest',
    containerName: 'mongo',
    hostPort: 27018,
    containerPort: 27017,
    hostDbDataPath: '/data/db',
    containerDbDataPath: '/data/db',
};
