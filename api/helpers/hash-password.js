
const Constant=sails.config.constant

module.exports = {


  friendlyName: 'Bcrypt password',


  description: '',


  inputs: {
    //user given password
    password:{
      type:"string"
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    
      let hash= await Constant.bcrypt.hash(inputs.password,Constant.SALT);

      return exits.success({ hash })

  },


};

