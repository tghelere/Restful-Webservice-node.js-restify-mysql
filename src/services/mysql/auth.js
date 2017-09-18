const sha1 = require('sha1')
const jwt = require('jsonwebtoken')
const auth = deps => {
    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
                const queryData = [email, sha1(password)]
                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Failed to find user', reject)
                        return false
                    }
                    const {email, id} = results[0]
                    const token = jwt.sign({email, id}, 'teste', {expiresIn: 60 * 60 * 24})
                    resolve({ token });
                    // resolve({ pagination: { page: 2, results: results.length }, users: results });
                });
            });
        }
    }
}

module.exports = auth;