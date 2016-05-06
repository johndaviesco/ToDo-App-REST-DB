var connectionString = process.env.DATABASE_URL || 'postgres://jdc:abcd@localhost/todo';

module.exports = connectionString;
