var pg = require('pg');
var path = require('path');
var connectionString = "postgres://jdc:abcd@localhost/todo";

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
