/**
 * IssueBookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Constant = sails.config.constant;

module.exports = {

    issue_book: async (req, res) => {
        try {

            let id = req.params.userId;
            let bookId = req.query.book;

            console.log(bookId);
            let user = await User.findOne({ id: id });

            console.log(user);
            let bId = await Book.find({ id: bookId })
            .populate("issues");

            // console.log(bId);
            if (bId[0].id === bookId) {
                let issue = await Issue.create({
                    isBook:req.body.isBook
                })
                res.status(200).json({
                    issue
                });

                //send email to user
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
};

