/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    //list of all category 
    list: async (req, res) => {
        try {
            const { skip, limit,search } = req.query;
            const category = await Category.find({
                categoryName: { startsWith: search } //search with category name
              }).skip(skip*limit).limit(limit)
                .populate("books", { select: ['bookName'] });

            res.status(200).json({
                message: "All Category",
                count:category.length,
                category
            });

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Categories not found"
            });
        }
    },

    //single category
    single_category: async (req, res) => {
        try {
            const id = req.params.categoryId

            const category = await Category.findOne({ id: id });
            console.log(category);
            if (category) {
                res.status(200).json({
                    category: category
                });
            }
            else {
                res.status(404).json({
                    message: "Category Not Found"
                });
            }

        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    },

    //create a category
    create_category: async (req, res) => {
        try {
            let { categoryName } = req.body;

            let category = await Category.create({
                categoryName: categoryName
            });
            res.status(201).json({
                message: "Create Category",
                category
            });

        } catch (error) {
            res.status(500).json({
                message: "Not Created"
            });
        }
    },

    //update a category
    update_category: async (req, res) => {
        try {
            let { categoryName } = req.body;
            let id = req.params.categoryId;

            const Match = await Category.findOne({ id: id });

            if (Match) {
                await Category.update({ id: id }).set({
                    categoryName: categoryName
                });

                res.status(200).json({
                    message: "update Category",
                });
            }
            else {
                res.status(404).json({
                    message: "Category Not Found"
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Not updated"
            });
        }

    },

    //delete a category
    delete_category: async (req, res) => {
        try {
            let id = req.params.categoryId;
            const Match = await Category.findOne({ id: id });

            if (Match) {
                await Category.destroy({ id: id });
                res.status(200).send({
                    message: "category Delete "
                });
            }
            else {
                res.status(404).json({
                    message: "Category Not Found"
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

