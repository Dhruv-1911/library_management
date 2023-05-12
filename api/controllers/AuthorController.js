/**
 * AuthorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const getMessage = sails.config.messages;

module.exports = {

    //get list of all author with search and pagination
    list: async (req, res) => {
        try {
            const { skip, limit,search } = req.query;

            let authors = await Author.find({
                authorName: { startsWith: search } //search with authorname
              }).skip(skip*limit)
                .limit(limit)
                .populate("books", { select: ['bookName'] });

            res.status(200).json({
                message: getMessage.ALL_AUTHOR,
                Total_Author: authors.length,
                authors
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //get single author
    single_author: async (req, res) => {
        try {
            const id = req.params.authorId

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            const author = await Author.findOne({ id: id });

            console.log(author);
            if (author) {
                res.status(200).json({
                    author: author
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.AUTHOR_NOT_FOUND
                });
            }

        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }

    },

    //create author
    create_author: async (req, res) => {
        try {
            let { authorName, authorSurname, Nationality, dateOfBirth, dateOfDeath } = req.body

            let capitalize = (str) => {
                return (
                    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                )
            }

            if (!authorName) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.AUTHOR_NAME_REQUIRE,
                });
            }
            if (!authorSurname) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.AUTHOR_SURNAME_REQUIRE,
                });
            }
            if (!Nationality) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.NATIONALITY_REQUIRE,
                });
            }
            if (!dateOfBirth) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.DOB_REQUIRE,
                });
            }
            if (!dateOfDeath) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.DOD_REQUIRE,
                });
            }

            const author = await Author.create({
                authorName:capitalize(authorName),
                authorSurname:capitalize(authorSurname),
                Nationality,
                dateOfBirth,
                dateOfDeath
            }).fetch()
            res.status(201).json({
                message: getMessage.AUTHOR_CREATE,
                author
            });

        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }

    },

    //author update
    update_author: async (req, res) => {
        try {
            let id = req.params.authorId;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }
            //find id into author model
            const Match_a = await Author.findOne({ id: id });

            if (Match_a) {
                await Author.update({ id: id }).set(req.body);

                res.status(200).json({
                    message: getMessage.AUTHOR_UPDATE
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.AUTHOR_NOT_FOUND
                });
            }


        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //delete author
    delete_author: async (req, res) => {
        try {
            let id = req.params.authorId;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            const Match_a = await Author.findOne({ id: id });

            if (Match_a) {
                await Author.destroy({ id: id });
                res.status(200).send({
                    message: getMessage.AUTHOR_DELETE
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.AUTHOR_NOT_FOUND
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    }

};

