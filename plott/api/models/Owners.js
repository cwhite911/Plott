/**
* Owners.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Define a custom table name
  tableName: 'tbl_owners',

  // Set schema true/false for adapters that support schemaless
  schema: true,
  // autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      // unique: true,
      // primaryKey: true,
      columnName: 'ownerid'
    },
    name: {
      type: 'string',
      maxLength: 100
    },
    address: {
      type: 'string',
      maxLength: 100
    },
    city: {
      type: 'string',
      maxLength: 50
    },
    state: {
      type: 'string',
      maxLength: 2
    },
    zip: {
      type: 'integer'
    },
    phone: {
      type: 'integer'
    }
  }
};
