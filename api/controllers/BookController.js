/**
 * bookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: async (req, res) => {
        try {
            let books = await Book.find()
            .populate("categories")
            .populate("authors")
            res.status(200).json({
                message:"All Books",
                Total_Book:books.length,
                Books:books
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message:"Not Found"
            })
        }
    },
    single_book: async (req, res) => {
        try {

            let id = req.params.bookId;
    
            let book =await Book.findOne({_id:id});

            res.status(200).json({
                Book:book
            })

        } catch (error) {
            res.status(404).json({
                message:"Book Not Found"
            })
        }


    },
    create_book: async (req, res) => {
        try {
            let { bookName, Price, publishYear, bookImage,categories ,authors ,users} = req.body

            const book = await Book.create({
                bookName,
                Price,
                publishYear,
                bookImage,
                categories,
                authors,
                users
            });

            res.status(201).json({
                message: "book Create",
                Book:book
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Not Created"
            })
        }
    },

    update_book: async (req, res) => {
        try {
            let id = req.params.bookId;
            let Match_b = await Book.findOne({ _id: id })
            if (Match_b) {

                await Book.update({ _id: id }).set(req.body)

                res.status(200).json({
                    message: "update book",
                })

            } else {
                res.status(404).json({
                    message:"book not Found"
                })

            }
        } catch (error) {
            res.status(500).json({
                message: "Not Update"
            })
        }

    },
    delete_book: async (req, res) => {
        try {
            let id = req.params.bookId;
            let Match_b = await Book.findOne({ _id: id })
            if (Match_b) {

                await Book.destroy({ _id: id })

                res.status(200).json({
                    message: "Delete book",
                })

            } else {
                res.status(404).json({
                    message:"book Not Found"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Not Delete"
            })
        }
    }
};

