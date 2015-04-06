/**
* Hides.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // Define a custom table name
  tableName: 'tbl_hides',

  // Set schema true/false for adapters that support schemaless
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  // autoPK: false,
  attributes: {
    id: {
      type: 'integer',
      // unique: true,
      // primaryKey: true,
      columnName: 'hideid'
    },
    locationid: {
      type: 'integer',
    },
    geom: {

    }
  }
};
