var path = require('path');
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
