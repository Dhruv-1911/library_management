
const Constant = sails.config.constant;

module.exports = (req, res, next) => {

    try {
        const token = req.cookies.token;

        
        //here verify Jwt token
        const verify = Constant.JWT.verify(token, Constant.JWT_Secret);
    
        if (verify.userId === (req.params.userId || req.body.User )) {
            next();
        }
        else {
            res.status(404).json({
                message: "Please! Login With Right Credential.."
            })

        }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "auth failed"
        })
        console.log(error);
    }
}