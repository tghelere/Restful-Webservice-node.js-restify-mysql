const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
    return async (req, res, next) => {
        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']
            if (!token) {
                res.send(403, { error: 'Required Token' })
                return false
            }

            try {
                req.decoded = jwt.verify(token, process.env.JWT_SECRET)
            } catch (error) {
                res.send(403, { error: 'Failed to authenticate token' })
                return false
            }
        }
        next()
    }
}

module.exports = jwtMiddleware