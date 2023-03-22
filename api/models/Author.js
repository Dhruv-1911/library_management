/**
 * Author.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    authorName: {
      type: "string",
      required: true
    },

    authorSurname: {
      type: "string",
      required: true
    },

    Nationality: {
      type: "string",
      required: true
    },

    dateOfBirth: {
      type: "ref",
      columnType: "datetime",
      required: true
    },

    dateOfDeath: {
      type: "ref",
      columnType: "datetime"
    }

  },

};

