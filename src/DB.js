const { Client } = require('pg');

let DB_URI;

if(process.env.NODE_ENV === "test") { //if the node env is test it will set to the postgre test db else its going to our real db. 
    DB_URI = "postgresql:///airbnb_test";
} else {
    DB_URI = "postgresql:///airbnb";
}

let db = new Client({ connectionString: DB_URI });

db.connect();

module.exports = db;