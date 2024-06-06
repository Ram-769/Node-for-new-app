const mongoose = require("mongoose");
// const mongoose = require("");
const globalSettings = require("./settings");
const schemaDefinitions = require("./schema");
const mongooseOptions = globalSettings.mongooseOptions;
const mongoConnections = {};

let collections;

function initializeCollections(dbConnections) {
  collections = {};
  for (const [dbName, dbConnection] of Object.entries(dbConnections)) {
    for (const schemaDef of schemaDefinitions) {
      if (schemaDef.db.trim() === dbName && schemaDef.coll) {
        const alias = `${schemaDef.db.trim()}_${schemaDef.coll.trim()}`
        collections[alias] = dbConnection.model(schemaDef.coll.trim(), schemaDef.schema);
      }
    }
  }
}

//return collection

function getModel(alias) {
  return collections[alias];
}

module.exports = {
  product: function (collectionName) {
    return collections["restdb_" + collectionName];
  },
  
  productCollection:{
    user1:'project',
    user2:'category',
    user3:'apilist',

},
gitdb: function (collectionName) {
  return collections["gitdb_" + collectionName];
},

gitdbcollecions:{
  table:'userdata',
 table2:'sinup'

},

serverdb: function (collectionName) {
  return collections["serverdb_" + collectionName];
},
serverdbcollections:{
  table:'userdata',
},
 

  mongoInitializer: async function () {
    try {
      for await (const mongoConfig of globalSettings.mongoConfigs) {
        const mongoDb = await mongoose.createConnection(mongoConfig.url, mongooseOptions);
        await mongoDb.on("error", function (error) {
          console.log(`error occurred while connecting MongoDB`);
          throw error;
        });
        await mongoDb.once("open", function () {
          console.log(`Client ${mongoConfig.name} MongoDB Connection established!`);
        });
        mongoConnections[mongoConfig.name] = mongoDb;
      }
      initializeCollections(mongoConnections);
    } catch (error) {
      throw error;
    }
    // return initializeCollections(mongoConnections);

  },
  getModel: getModel
};
