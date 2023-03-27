/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    Name:{
      type:"string",
      required:true
    },

    Email:{
      type:"string",
      required: true,
      unique: true,
      isEmail: true
    },

    Password: {
      type: 'string',
      unique: true,
      custom: function (value) {
        return _.isString(value) && value.length >= 8;
      }
    },

    Role:{
      type:"string",
      defaultsTo:"User",
      isIn:["User","Admin"]
    },

    books:{
      collection:"book",
      via:"users"
    }

  },

};

