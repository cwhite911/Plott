/**
* Hides.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    _id: {
      type: 'integer',
      required: true
    },
    set: {
      model: 'tracks'
    },
    geom: {
      type: 'object'
      required: true
    }
  }
};
