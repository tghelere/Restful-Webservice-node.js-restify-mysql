const mysqlServer = require('mysql');

//  Configure the connection and rename this file to 'dbServer.js'
const connection = mysqlServer.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler });
// const productModule = require('./products')({ connection, errorHandler });

module.exports = {
    categories: () => categoryModule
        // products: () => productModule
}