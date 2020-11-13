const { exec } = require('child_process');

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
    connection: BASE_URL = exec(`heroku config: get HEROKU_POSTGRESQL_NAVY_URL -a vouchers-meta-backend`) ,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    ssl: true
  }

};
