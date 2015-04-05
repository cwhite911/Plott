/**
* Dogs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Define a custom table name
  tableName: 'tbl_dogs',

  // Set schema true/false for adapters that support schemaless
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {
    id: {
      type: 'integer',
      columnName: 'dogid',
      autoIncrement: true
    },
    name: {
      type: 'string',
      maxLength: 100,
      columnName: 'name'
    },
    nickname: {
      type: 'string',
      maxLength: 100,
      columnName: 'nickname'
    },
    breedid: {
      type: 'string',
      maxLength: 10,
      columnName: 'breedid'
    },
    training: {
      type: 'integer',
      columnName: 'training'
    },
    ownerid: {
      type: 'integer',
      columnName: 'ownerid'
    }
  }

};
