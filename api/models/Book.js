/**
 * Book.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    bookName: {
      type: "string",
      required: true
    },

    Price: {
      type: "number",
      required: true
    },

    publishYear: {
      type: "number",
      required: true
    },

    bookImage: {
      type: "string",
      required: true
    },
    
    // Categories:{
    //   collection:"category",
    //   via:"Book"
    // }


  },

};

