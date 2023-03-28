/**
 * bookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    //get list of all book with search and pagination and populate with category and author
    list: async (req, res) => {
        try {
            const { skip, limit, search } = req.query;
            let books = await Book.find({
                bookName: { startsWith: search } //search with book name
              }).skip(skip*limit).limit(limit)
                .populate("categories")
                .populate("authors");
            console.log(books);
            res.status(200).json({
                message: "All Books",
                Total_Book: books.length,
                Books: books
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Not Found"
            });
        }
    },

    userList:async(req,res)=>{
        try {
            const{ search,author ,category}= req.query;
            let books = await Book.find({
                bookName: { startsWith: search },
                AuthorName:{startsWith: author}
                // categoryName:{ contains : category}
            })
            .populate("categories")
            .populate("authors");
         console.log(books);
        
            res.status(200).json({
                count:books.length,
                books
            })

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Not Found"
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
            res.status(404).json({
                message: "Book Not Found"
            });
        }


    },

    //create a book
    create_book: async (req, res) => {
        try {
            let { bookName, Price, publishYear, bookImage, categories, authors, users } = req.body;

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
                Book: book
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Not Created"
            });
        }
    },

    //update a book
    update_book: async (req, res) => {
        try {
            let id = req.params.bookId;
            let Match_b = await Book.findOne({ id: id });
            if (Match_b) {

                await Book.update({ id: id }).set(req.body);

                res.status(200).json({
                    message: "update book",
                });

            } else {
                res.status(404).json({
                    message: "book not Found"
                });

            }
        } catch (error) {
            res.status(500).json({
                message: "Not Update"
            });
        }

    },
    
    //delete book
    delete_book: async (req, res) => {
        try {
            let id = req.params.bookId;
            let Match_b = await Book.findOne({ id: id });
            if (Match_b) {

                await Book.destroy({ id: id });

                res.status(200).json({
                    message: "Delete book",
                });

            } else {
                res.status(404).json({
                    message: "book Not Found"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Not Delete"
            });
        }
    }
};

