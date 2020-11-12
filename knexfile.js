
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

  production: {
    client: 'postgresql',
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

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
