const Constant = sails.config.constant

module.exports = {


  friendlyName: 'Compare password',


  description: '',


  inputs: {
    //user given password
    password:{
      type:"string"
    },
    //hash password
    U_password:{
      type:"string"
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs,exits) {

    let Match = await Constant.bcrypt.compare(inputs.password,inputs.U_password);

    return exits.success({ Match })
  }
};



