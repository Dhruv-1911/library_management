/**
 * IssueBook.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user:{
      type:"string"
    },

    book:{
      type:"string"
    },

    isBook:{
      type:"string",
      defaultsTo:"Return",
      isIn:["Issue","Return"]
    },

    books:{
      model:"book"
    }

  },

};

