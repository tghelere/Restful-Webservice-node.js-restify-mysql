const db = require('../services/mysql/dbServer')

const routes = (server) => {
    server.post('authentication', async(req, res, next) => {
        try {
            const {email, password} = req.params
            res.send(await db.auth().authenticate(email, password))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.get('category', async(req, res, next) => {
        try {
            res.send(await db.categories().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.post('category', async(req, res, next) => {
        const { category, description, slug, status } = req.params
        try {
            res.send(await db.categories().save(category, description, slug, status))
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