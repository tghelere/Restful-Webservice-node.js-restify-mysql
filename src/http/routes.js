const categories = require('../services/mysql');

const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('WebService Works!!!');
        next();
    });

    server.get('category', (req, res, next) => {
        categories.then(categories => {
            res.send(categories);
            next();
        }).catch(error => {
            res.send(error);
            next();
        });
    });
    server.post('category', (req, res, next) => {
        const { name } = req.params;
        res.send(name);
        next();
    });
    // server.put('category', (req, res, next) => {
    //     res.send();
    //     next();
    // });
    // server.delete('category', (req, res, next) => {
    //     res.send();
    //     next();
    // });
};

module.exports = routes;