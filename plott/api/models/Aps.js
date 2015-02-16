/**
* Aps.js
*
* @description :: TODO: Aps model store wireless access point data that stores the access point mac, name, location, and coordinate in geojson
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    _id: {
      type: 'string',
      required: true
    },
    alias: {
      type: 'string'
    },
    location: {
      type: 'string'
    },
    geom:{
      type: 'object'
    }
  }
};
