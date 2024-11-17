// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mssql',
    connection: {
      host: '192.168.1.41', // Your SQL Server address
      user: 'admin', // Your SQL Server username
      password: 'Password-2', // Your SQL Server password
      database: 'FashTech', // Your database name
    },
    migrations: {
      tableName: 'migrations'
    }
  }
  
};