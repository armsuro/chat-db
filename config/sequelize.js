module.exports = {
  production: {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "123456",
    "database": process.env.DB_DATABASE || "chat",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "5432",
    "dialect": process.env.DB_CONNECTION || "postgresql"
  },
  development: {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "123456",
    "database": process.env.DB_DATABASE || "chat",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "5432",
    "dialect": process.env.DB_CONNECTION || "postgresql"
  },
  test: {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "123456",
    "database": process.env.DB_DATABASE || "chat",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "5432",
    "dialect": process.env.DB_CONNECTION || "postgresql"
  }
}
