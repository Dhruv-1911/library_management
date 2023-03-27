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
      type: "string",
      required: true
    },

    bookImage: {
      type: "string",
      required: true
    },
    
    categories:{
      model:"category",
      required:true
    },

    authors:{
      model:"author",
      required:true
    },
    
    users:{
      model:"user",
      required:true
    },
    
    isIssue:{
      type: "boolean", 
      defaultsTo: false
    },

  },

};

