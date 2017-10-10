const sha1 = require('sha1')
const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT id, email FROM users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list users', reject)
                        return false
                    }
                    resolve({ users: results });
                    // resolve({ pagination: { page: 2, results: results.length }, users: results });
                });
            });
        },
        save: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
                    if (error) {
                        errorHandler(error, `Failed to save the user ${email}`, reject)
                        return false
                    }
                    resolve({ user: { email, id: results.insertId } });
                });
            });
        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Failed to update the user id: ${id}`, reject)
                        return false
                    }
                    resolve({ user: { id }, affectedRows: results.affectedRows });
                });
            });
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Failed to delete the user from id = ${id}`, reject)
                        return false
                    }
                    resolve({ message: 'User removed successfully', affectedRows: results.affectedRows });
                });
            });
        }
    }
}

module.exports = users;