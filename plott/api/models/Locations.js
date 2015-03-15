/**
* Locations.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Define a custom table name
  tableName: 'tbl_locations',

  // Set schema true/false for adapters that support schemaless
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    locationid: {
      type: 'integer'
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
    }
    zip: {
      type: 'integer'
    },
    geom: {

    }
  }
};
