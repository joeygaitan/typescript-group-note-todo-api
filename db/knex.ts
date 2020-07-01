let environment = process.env.NODE_ENV || 'development';
let config = require('../knexfile.js')[environment]

module.exports = require('knex')(config);

const path = require('path')
const dbname = 'db_todo_note_together'



module.exports = {
    development: {
        client: 'postgresql',
        // username: 'misterjoe',
        // password: '8161',
        connection: process.env.DATABASE_URL || { user: 'misterjoe',password:'1234', database: 'db_todo_note_together' },
        migrations: {
            directory: path.join(__dirname, 'db', 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'db', 'seeds')
        }
    }
    // ,production: {
    //   client: 'pg',
    //   connection: {
    //     database: process.env.RDS_DB,
    //     host: process.env.RDS_HOST,
    //     user: process.env.RDS_USER,
    //     password: process.env.RDS_PASSWORD,
    //     port: process.env.RDS_PORT
    //   },
    //   migrations: {
    //       directory: (__dirname, 'db', 'migrations')
    //     },
    //   seeds: {
    //       directory: (__dirname, 'db', 'seeds', 'production')
    //     },
    // },

}