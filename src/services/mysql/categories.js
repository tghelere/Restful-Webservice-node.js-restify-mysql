const slugify = require('../slugify')
const categories = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM categories', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list categories', reject)
                        return false
                    }
                    resolve({ categories: results })
                    // resolve({ pagination: { page: 2, results: results.length }, categories: results })
                })
            })
        },
        save: (category, description, slug, status) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                slug = slugify(slug)
                connection.query('INSERT INTO categories (category, description, slug, status) VALUES (?, ?, ?, ?)', [category, description, slug, status], (error, results) => {
                    if (error) {
                        errorHandler(error, `Failed to save the category ${category}`, reject)
                        return false
                    }
                    resolve({ category: {id: results.insertId, category, description, slug, status} })
                })
            })
        },
        update: (id, category) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE categories SET category = ? WHERE id = ?', [category, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Failed to update the category ${category}`, reject)
                        return false
                    }
                    resolve({ category: { category, id }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id, category) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Failed to delete the category from id = ${id}`, reject)
                        return false
                    }
                    resolve({ message: 'Category removed successfully', affectedRows: results.affectedRows })
                })
            })
        }
    }
}

module.exports = categories