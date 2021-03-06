const NodeCouchDb = require('node-couchdb');

let jsonData = require('./config.json');
const couchUsername = jsonData.couchUsername;
const couchPassword = jsonData.couchPassword;
const dbErrors = jsonData.dbErrors;

const couch = new NodeCouchDb({
  auth: {
    user: couchUsername,
    password: couchPassword,
  }
});

const sendError = (component, error, text) => {
  couchPost(dbErrors, {
    app: 'lastfm',
    component: component,
    error: error,
    text: text,
  });
};

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

const updateDatabase = (databaseName, databaseViewUrl, newData) => new Promise((resolve, reject) => {

  resolve(couch.get(databaseName, databaseViewUrl).then(
    function(data) {
      if (data.data.rows[0]) {
        let dataObject = data.data.rows[0];
        couch.update(databaseName, Object.assign({
          _id: dataObject.doc._id,
          _rev: dataObject.doc._rev,
          updatedAt: Date.now(),
        }, newData)
        );
      }
      else {
        couch.uniqid().then(function(ids){
          const id = ids[0];
          couch.insert(databaseName, Object.assign({
            _id: id,
            created_at: Date.now(),
            updated_at: Date.now(),
          }, newData)
          );
        });
      }
    }));
  reject((error) => {
    sendError('couch update', error, 'updateDatabase error');
  });
});

module.exports = {
  couchGet,
  couchPost,
  couchDelete,
  couchPut,
  updateDatabase,
  sendError,
};