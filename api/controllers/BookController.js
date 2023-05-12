/**
 * bookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const getMessage = sails.config.messages;
module.exports = {


    //get list of all book with search and pagination and populate with category and author
    list: async (req, res) => {
        try {
            const { skip, limit, search } = req.query;
            let books = await Book.find().skip(skip * limit)
                .limit(limit)
                .populate("categories")
                .populate("authors");

            res.status(200).json({
                message: getMessage.ALL_BOOK,
                Total_Book: books.length,
                Books: books
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //here user can search by book name and authorname and filter category
    userList: async (req, res) => {
        try {
            let findData = {
                where: {
                    bookName: "string",
                    Price: "number"
                }
            }
            let { search } = req.params
            if (search) {
                let searchA = search;
                let searchB = search;

                findData.where.or = [
                    { bookName: { contains: searchA } },
                    { Price: { contains: searchB } }
                ]
            }

            const { searchB, searchA, category } = req.query;

            let books = await Book.find({
                // bookName: { startsWith: searchB },
                bookName: { contains: searchB },
                Price: { contains: searchA }
            })
                .populate("categories")
                .populate("authors");

            console.log(books);

            res.status(200).json({
                count: books.length,
                books
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //get single book
    single_book: async (req, res) => {
        try {

            let id = req.params.bookId;

            let book = await Book.findOne({ where: { id: i } });
            if (book) {
                res.status(200).json({
                    Book: book
                });
            }
            else {
                res.status(404).json({
                    message: "Book All-ready in the library"
                });
            }

        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }


    },

    //create a book
    create_book: async (req, res) => {
        try {
            let { bookName, Price, publishYear, bookImage, categories, authors, users } = req.body;

            let capitalize = (str) => {
                return (
                    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                )
            }

            if (!bookName) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.BOOKNAME_REQUIRE,
                });
            }
            if (!Price) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.PRICE_REQUIRE,
                });
            }
            if (!publishYear) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.PUBLISHYEAR_REQUIRE,
                });
            }
            if (!categories) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.CATEGORIES_REQUIRE,
                });
            }
            if (!authors) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.AUTHOR_REQUIRE,
                });
            }
            if (!users) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.USER_REQUIRE,
                });
            }

            const book = await Book.create({
                bookName: capitalize(bookName),
                Price,
                publishYear,
                bookImage,
                categories,
                authors,
                users
            }).fetch()

            res.status(201).json({
                message: getMessage.BOOK_CREATE,
                Book: book
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //update a book
    update_book: async (req, res) => {
        try {
            let id = req.params.bookId;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            let Match_b = await Book.findOne({ id: id });
            if (Match_b) {

                await Book.update({ id: id }).set(req.body);

                res.status(200).json({
                    message: getMessage.BOOK_UPDATE,
                });

            } else {
                res.status(404).json({
                    message: getMessage.BOOK_NOT_FOUND
                });

            }
        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }

    },

    //delete book
    delete_book: async (req, res) => {
        try {
            let id = req.params.bookId;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            let Match_b = await Book.findOne({ id: id });
            if (Match_b) {

                await Book.destroy({ id: id });

                res.status(200).json({
                    message: getMessage.BOOK_DELETE,
                });

            } else {
                res.status(404).json({
                    message: getMessage.BOOK_NOT_FOUND
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    }
};

