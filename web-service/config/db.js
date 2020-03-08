module.exports = {
  port: 8081,
  // sequelizer configuration
  db: {
    DB_NAME: process.env.DB_NAME || 'great-pizza',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASS || '',
    DB_STORAGE: process.env.STORAGE || './db.great-pizza.sqlite',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  }
}
