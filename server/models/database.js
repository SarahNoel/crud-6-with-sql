var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/outfit';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE clothes(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, top VARCHAR(40) not null, bottom VARCHAR(40) not null, shoes VARCHAR(40) not null, accessories VARCHAR(100))');
query.on('end', function() { client.end(); });
