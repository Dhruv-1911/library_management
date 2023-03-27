/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



const Constant = sails.config.constant

module.exports = {
    //user or admin sign up
    sign_up: async (req, res) => {
        try {

            let { Name, Email, Password, Role } = req.body

            // here create a hash password with helper
            let hash = await sails.helpers.hashPassword.with({
                password: Password
            })
            // console.log(hash);
            let user = await User.create({
                Name: Name,
                Email: Email,
                Password: hash.hash,
                Role: Role
            });

            res.status(201).json({
                message: "User Sign up",
                user
            })

        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },

    //user or admin login
    login: async (req, res) => {
        try {
            let { Email, Password } = req.body

            let user = await User.findOne({ Email: Email })
            // console.log(user.Password);

            if (user) {

                //hash password with helper
                const Match = await sails.helpers.comparePassword.with({
                    password: Password,
                    U_password: user.Password
                })

                // console.log(Match);

                //jwt token with the help of helper generate token with user id & Role
                const token = await sails.helpers.generateToken.with({
                    data: {
                        userId: user.id,
                        Role: user.Role
                    },
                    expireIn: Constant.expire,
                });
                // console.log(token);

                if (Match.Match && (Email === user.Email)) {
                    //here send token with cookie
                    res.cookie("token", token.token, {
                        httpOnly: true
                    })

                    res.status(200).json({
                        message: "User login",
                        token: token
                    })
                }
                else {
                    res.status(500).json({
                        message: " Email or Password not Match"
                    })
                }
            } else {
                res.status(404).json({
                    message: "email not found"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "All field required"
            })
        }
    },

    issue_book: async (req, res) => {
        try {

            let id = req.params.userId
            console.log(id);
            let uId = await User.findOne({ id : id });
            // console.log(req.body.book);
        //    let Id= req.body.book
            let bId = await Book.find({id:req.query.book})
        console.log(req.query.book);

            // console.log(bId[0].isIssue);
            // console.log(bId[0].id === req.query.book);
            if (bId[0].id === req.query.book)
             {  

                // let bookId = await Book.find({where:{id:req.query}})
                // console.log(bookId);

                // uId[0].books[0].isIssue
                // let issue = await User.update({ isIssue: false }).set({ isIssue: true })
                // console.log(bookId[0].isIssue);
                // console.log(bId[0].id);
               //  let  MId=bId[1].id;
                // let Issue=bId.isIssue;

                console.log(req.query.book);
                let issue = await Book.update({id:req.query.book}).set({isIssue:true}).fetch()
                res.status(200).json({
                    issue
                })
            }
            else{
                res.status(500).send({
                    message:"user not found"
                })
            }

        } catch (error) {
            // console.log(error);
            res.status(500).json({
                error: error
            })
        }
    },

    return_book:async(req,res)=>{
        try {
            
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },

    //log-out user or admin 
    log_out: async (req, res) => {
        try {
            //here clear cookie
            res.clearCookie("token");
            res.send({
                message: "user logout "
            })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
};

