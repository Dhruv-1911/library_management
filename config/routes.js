/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },

  'post /user/sign_up': 'UserController.sign_up',
  'post /user/login': 'UserController.login',
  "get /user/issue/:userId":"UserController.issue_book",
  'get /user/logout/:userId': 'UserController.log_out',
  
  'get /category/list':'CategoryController.list',
  'get /category/:categoryId':'CategoryController.single_category',
  'post /category/create':'CategoryController.create_category',
  'patch /category/:categoryId':'CategoryController.update_category',
  'delete /category/:categoryId':'CategoryController.delete_category',
  
  'get /author/list':'AuthorController.list',
  'get /author/:authorId':'AuthorController.single_author',
  'post /author/create':'AuthorController.create_author',
  'patch /author/:authorId':'AuthorController.update_author',
  'delete /author/:authorId':'AuthorController.delete_author',
  
  'get /book/list':'BookController.list',
  'get /book/:bookId':'BookController.single_book',
  'post /book/create':'BookController.create_book',
  'patch /book/:bookId':'BookController.update_book',
  'delete /book/:bookId':'BookController.delete_book',
  // 'get /:search':'BookController.search_router',
  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
