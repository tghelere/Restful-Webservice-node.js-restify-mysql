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
                    resolve({ categories: results });
                    // resolve({ pagination: { page: 2, results: results.length }, categories: results });
                });
            });
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
                    if (error) {
                        errorHandler(error, `Failed to save the category ${name}`, reject)
                        return false
                    }
                    resolve({ category: { name, id: results.insertId } });
                });
            });
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Failed to update the category ${name}`, reject)
                        return false
                    }
                    resolve({ category: { name, id: results.insertId } });
                });
            });
        },
        del: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Failed to delete the category ${name}`, reject)
                        return false
                    }
                    resolve({ message: 'Category removed successfully' });
                });
            });
        }
    }
}

module.exports = categories;