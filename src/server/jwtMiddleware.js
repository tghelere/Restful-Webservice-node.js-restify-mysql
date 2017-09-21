const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
    return async (req, res, next) => {
        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']
            if (!token) {
                res.send(403, { error: 'Required Token' })
                return false
            }

            await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.send(403, { error: 'Failed to authenticate token' })
                    return false
                } else {
                    req.decoded = decoded
                }
            })
        }
        next()
    }
}

module.exports = jwtMiddleware