const db = require('../services/mysql/dbServer')

const routes = (server) => {
    server.get('category', async(req, res, next) => {
        try {
            res.send(await db.categories().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.post('category', async(req, res, next) => {
        const { name } = req.params
        try {
            res.send(await db.categories().save(name))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.put('category', async(req, res, next) => {
        const { id, name } = req.params
        try {
            res.send(await db.categories().update(id, name))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.del('category', async(req, res, next) => {
        const { id, name } = req.params
        try {
            res.send(await db.categories().del(id, name))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/', (req, res, next) => {
        res.send('WebService Works!!!')
        next()
    })
}

module.exports = routes