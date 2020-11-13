const { exec } = require('child_process');

const BASE_URL = exec('heroku config: get HEROKU_POSTGRESQL_NAVY_URL -a vouchers-meta-backend')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'voucher',
      user: 'root',
      password: 'meta2020'
    }, 
    migrations: {
      directory: './src/database/migrations'
    }
    
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      BASE_URL,
      host: 'ec2-34-231-56-78.compute-1.amazonaws.com'  
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
