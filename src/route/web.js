import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController"
import categoryController from "../controller/categoryController";
import productController from '../controller/productController';
import testController from '../controller/testController';
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    //API
    //API Login User
    router.post('/api/login', userController.handleLogin);
    //API User
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    //API Category
    router.get('/api/get-category', categoryController.getCategory);

    // API Product 
    router.get('/api/get-product', productController.handleGetProduct);
    router.get('/api/product-detail', productController.handleGetProductDetail);

    return app.use("/", router);
}

module.exports = initWebRouter;