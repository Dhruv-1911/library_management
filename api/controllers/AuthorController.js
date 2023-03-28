/**
 * AuthorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //get list of all author with search and pagination
    list: async (req, res) => {
        try {
            const { skip, limit,search } = req.query;
            let authors = await Author.find({
                authorName: { startsWith: search } //search with authorname
              }).skip(skip*limit).limit(limit)
                .populate("books", { select: ['bookName'] });

            res.status(200).json({
                message: "All author",
                Total_Author: authors.length,
                authors
            });

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "authors not found"
            });
        }
    },

    //get single author
    single_author: async (req, res) => {
        try {
            const id = req.params.authorId

            const author = await Author.findOne({ id: id });

            console.log(author);
            if (author) {
                res.status(200).json({
                    author: author
                });
            }
            else {
                console.log(error);
                res.status(404).json({
                    message: "author Not Found"
                });
            }

        } catch (error) {
            res.status(500).json({
                error: error
            });
        }

    },

    //create author
    create_author: async (req, res) => {
        try {
            let { authorName, authorSurname, Nationality, dateOfBirth, dateOfDeath } = req.body

            const author = await Author.create({
                authorName,
                authorSurname,
                Nationality,
                dateOfBirth,
                dateOfDeath
            });
            res.status(201).json({
                message: "Author Create"
            });

        } catch (error) {
            res.status(500).json({
                message: "Not Created"
            });
        }

    },

    //author update
    update_author: async (req, res) => {
        try {
            let id = req.params.authorId;

            const Match_a = await Author.findOne({ id: id });

            if (Match_a) {
                await Author.update({ id: id }).set(req.body);

                res.status(200).json({
                    message: "update author",
                });
            }
            else {
                res.status(404).json({
                    message: "author Not Found"
                });
            }


        } catch (error) {
            // console.log(error);
            res.status(500).json({
                message: "Not Update"
            });
        }
    },

    //delete author
    delete_author: async (req, res) => {
        try {
            let id = req.params.authorId;

            const Match_a = await Author.findOne({ id: id });

            if (Match_a) {
                await Author.destroy({ id: id });
                res.status(200).send({
                    message: "author Delete "
                });
            }
            else {
                res.status(404).json({
                    message: "author Not Found"
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Not Deleted"
            });
        }
    }

};

