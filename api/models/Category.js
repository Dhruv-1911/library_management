/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      categoryName:{
        type:"string",
        required: true,
      },

      books:{
        collection:"book",
        via:"categories"
      }

  },

};

