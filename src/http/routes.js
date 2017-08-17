const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('funcionando');
        next();
    });
};

module.exports = routes;