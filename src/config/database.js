require(`dotenv`).config()
function loggingDB(msg) {
  console.log(msg)
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || `root`,
    database: process.env.DB_NAME || `tint_t2`,
    host: process.env.DB_HOST || ``,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',  // Usa URI DB en vez de config manual
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
}
