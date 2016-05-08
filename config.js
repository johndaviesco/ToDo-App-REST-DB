var connectionString = process.env.DATABASE_URL || 'postgres://ubuntu:Abcd1234@localhost/todo';

module.exports = connectionString;
