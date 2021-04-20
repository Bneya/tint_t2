require(`dotenv`).config()
function loggingDB(msg) {
  console.log(msg)
}

console.log('USERNAME', process.env.DB_USERNAME);
console.log('PASSWORD', process.env.DB_PASSWORD);

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || `root`,
    database: process.env.DB_NAME || `tint_t2`,
    host: process.env.DB_HOST || ``,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
}
