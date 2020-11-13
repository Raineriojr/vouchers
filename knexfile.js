
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
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: 'ec2-34-231-56-78.compute-1.amazonaws.com'
    },
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
