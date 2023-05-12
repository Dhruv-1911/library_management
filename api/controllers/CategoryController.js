/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const getMessage = sails.config.messages;

module.exports = {

    //list of all category 
    list: async (req, res) => {
        try {
            const { skip, limit,search } = req.query;

            const category = await Category.find({
                categoryName: { startsWith: search } //search with category name
              }).skip(skip*limit)
                .limit(limit)
                .populate("books", { select: ['bookName'] });

            res.status(200).json({
                message: getMessage.ALL_CATEGORY,
                count:category.length,
                category
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //single category
    single_category: async (req, res) => {
        try {
            const id = req.params.categoryId;
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            const category = await Category.findOne({ id: id });
      
            if (category) {
                res.status(200).json({
                    message: getMessage.ALL_CATEGORY,
                    category: category
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.CATEGORY_NOT_FOUND
                });
            }

        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //create a category
    create_category: async (req, res) => {
        try {
            let { categoryName } = req.body;

            let capitalize = (str) => {
                return (
                    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                )
            }

            if (!categoryName) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.CATEGORY_NAME_REQUIRE,
                });
            }

            let category = await Category.create({
                
                categoryName: capitalize(categoryName)

            }).fetch();
            res.status(201).json({
                message: getMessage.CATEGORY_CREATE,
                category
            });

        } catch (error) {
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }
    },

    //update a category
    update_category: async (req, res) => {
        try {
            let { categoryName } = req.body;
            let id = req.params.categoryId;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            if (!categoryName) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.CATEGORY_NAME_REQUIRE,
                });
            }

            const Match = await Category.findOne({ id: id });

            if (Match) {
                await Category.update({ id: id }).set({
                    categoryName: categoryName
                });

                res.status(200).json({
                    message: getMessage.CATEGORY_UPDATE,
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.CATEGORY_NOT_FOUND
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: getMessage.WENT_WRONG
            });
        }

    },

    //delete a category
    delete_category: async (req, res) => {
        try {
            let id = req.params.categoryId;
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: getMessage.ID_REQUIRE,
                });
            }

            const Match = await Category.findOne({ id: id });

            if (Match) {
                await Category.destroy({ id: id });
                res.status(200).send({
                    message: getMessage.CATEGORY_DELETE
                });
            }
            else {
                res.status(404).json({
                    message: getMessage.CATEGORY_NOT_FOUND
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

