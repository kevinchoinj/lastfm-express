const NodeCouchDb = require('node-couchdb');

const {
  sendError,
} = require('./errors.js');

let jsonData = require('./config.json');
const couchUsername = jsonData.couchUsername;
const couchPassword = jsonData.couchPassword;

const couch = new NodeCouchDb({
  auth: {
    user: couchUsername,
    password: couchPassword,
  }
});

const couchGet = (database, databaseViewUrl) => new Promise((resolve, reject) => {
  resolve(couch.get(database, databaseViewUrl));
  reject((error) => {
    sendError('couch get', error, 'couchGet error');
  });
});

const couchPost = (database, newData) => new Promise((resolve) => {
  resolve(couch.uniqid()
    .then(function(ids){
      const id = ids[0];
      couch.insert(database, Object.assign({
        _id: id,
        created_at: Date.now(),
        updated_at: Date.now(),
      }, newData));
    })
  );
});

const couchDelete = (database, id, rev) => new Promise((resolve) => {
  resolve(couch.del(database, id, rev));
});

const couchPut = (database, newData) => new Promise((resolve, reject) => {
  resolve(couch.update(database, newData));
  reject((error) => {
    sendError('couch update', error, 'couchUpdate error');
  });
});

module.exports = {
  couchGet,
  couchPost,
  couchDelete,
  couchPut,
};