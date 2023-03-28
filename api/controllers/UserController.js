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

            let { Name, Email, Password, Role } = req.body;

            // here create a hash password with helper
            let hash = await sails.helpers.hashPassword.with({
                password: Password
            });
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
            });

        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    },

    //user or admin login
    login: async (req, res) => {
        try {
            let { Email, Password } = req.body;

            let user = await User.findOne({ Email: Email });
            // console.log(user.Password);

            if (user) {

                //hash password with helper
                const Match = await sails.helpers.comparePassword.with({
                    password: Password,
                    U_password: user.Password
                });

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
                    });

                    res.status(200).json({
                        message: "User login",
                        token: token
                    });
                }
                else {
                    res.status(500).json({
                        message: " Email or Password not Match"
                    });
                }
            } else {
                res.status(404).json({
                    message: "email not found"
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "All field required"
            });
        }
    },

    //  issue book list
    issueList: async (req, res) => {
        try {
            const user = await User.find({ where:{ Role:"User"}})
                .populate("books",{ where :{isIssue : true}});

            res.status(200).json({
                message: "All User",
                user
            });

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Categories not found"
            });
        }
    },

    //return book list
    returnList: async (req, res) => {
        try {
            const user = await User.find({ where:{ Role:"User"}})
                .populate("books",{ where :{isReturn : true}});

            res.status(200).json({
                message: "All User",
                user
            });

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Categories not found"
            });
        }
    },

    //when user book issue and send email
    issue_book: async (req, res) => {
        try {

            let id = req.params.userId;
            let bookId = req.query.book;

            let user = await User.findOne({ id: id });

            let bId = await Book.find({ id: bookId });
            // console.log(bId);
            if (bId[0].id === bookId) {
                //here set isisuue true when user book issue
                let issue = await Book.update({ id: bookId }).set({ isIssue: "true" })
                    .fetch();
                res.status(200).json({
                    issue
                });

                //send email to user with helper
                await sails.helpers.sendMail.with({
                    user: Constant.Email,
                    pass: Constant.PASS,
                    to: user.Email,
                    html: `hi ${user.Name},<br> Thank you for Issue ${bId[0].bookName} Book `
                });
            }
            else {
                res.status(500).send({
                    message: "Book not found"
                });
            }

        } catch (error) {
            // console.log(error);
            res.status(500).json({
                error: error
            });
        }
    },

    //when user return book and send email 
    return_book: async (req, res) => {
        try {

            let id = req.params.userId;
            let bookId = req.query.book;

            let user = await User.findOne({ id: id });

            let bId = await Book.find({ id: bookId });

            if (bId[0].id === bookId) {
                //here set isreturn true when user book return
                let issue = await Book.update({ id: bookId }).set({ isReturn: "true" })
                    .fetch();

                res.status(200).json({
                    issue
                });

                //send email to user
                await sails.helpers.sendMail.with({
                    user: Constant.Email,
                    pass: Constant.PASS,
                    to: user.Email,
                    html: `hi ${user.Name},<br> Thank you for Return ${bId[0].bookName} Book and Visit again`
                });
            }
            else {
                res.status(500).send({
                    message: "Book not found"
                });
            }

        } catch (error) {
            // console.log(error);
            res.status(500).json({
                error: error
            });
        }
    },

    //log-out user or admin 
    log_out: async (req, res) => {
        try {
            //here clear cookie
            res.clearCookie("token");

            res.send({
                message: "user logout "
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    }
};

