const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url  = 'mongodb://cnbetaAdmin:123456@mongo:27017/cnbeta'
// Database Name
const dbName = 'cnbeta';
const db = client.db(dbName);
// Create a new MongoClient
const client = new MongoClient(url);

const jsSchema = {
    id: String,
    title: String,
    summary: String,
    url: String,
    company: String,
    location: String,
    postDate: String,
    salary: String,
    isEasyApply: String,
    content: String
  }
// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db)
  client.close();
});

function createTextIndex(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Create the index
    collection.createIndex(
      { comments : "text" }, function(err, result) {
      console.log(result);
      callback(result);
    });
  };
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }