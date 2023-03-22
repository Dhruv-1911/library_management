
const Constant = sails.config.constant

module.exports = {


  friendlyName: 'Generate Token',


  description: '',


  inputs: {
    //pass the data with token
    data: {
      type: "json"
    },
    //token expire time
    expireIn: {
      type: "number"
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    try {
      
      let token = await Constant.JWT.sign(inputs.data, Constant.JWT_Secret,
        { expiresIn: inputs.expireIn });
 
      return exits.success({ token });
    }
    catch (error) {
      console.log(error);
      return exits.success(undefined);

    }
  }

};
