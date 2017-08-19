const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('funcionando');
        next();
    });

    server.get('category', (req, res, next) => {
        res.send(['1', 'lalala']);
        next();
    });
    server.post('category', (req, res, next) => {
        console.log(req);
        // const { name } = req.params;
        var name = req.params.name;
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