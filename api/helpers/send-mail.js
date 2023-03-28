
const Constant = sails.config.constant

module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    //here admin email
    user: {
      type: "ref",
      required: true
    },
   //admin email - password
    pass: {
      type: "ref",
      required: true
    },
    //user who issue or return book 
    to: {
      type: "ref",
      required: true
    },
    //content
    html:{
      type:"ref"
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    let mailTransporter = Constant.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${inputs.user}`,
        pass: `${inputs.pass}`
      }
    });
  
    let mailDetails = {
      from: `${inputs.user}`,
      to: `${inputs.to}`,
      subject: 'XYZ Library',
      html: `${inputs.html} `
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs');
        console.log(err)
      } else {
        console.log('Email sent successfully');
      }
    });
    return exits.success();
  }


};
