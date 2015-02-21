/**
* Breeds.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Define a custom table name
  tableName: 'tbl_breeds',

  // Set schema true/false for adapters that support schemaless
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    breedid: {
      type: 'string',
      maxLength: 10
    },
    name: {
      type: 'string',
      maxLength: 100
    }
  }
};
