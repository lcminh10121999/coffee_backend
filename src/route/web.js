import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController"
import categoryController from "../controller/categoryController";
import productController from '../controller/productController';
import testController from '../controller/testController';
import cartController from '../controller/cartController.js';
import storeController from '../controller/storeController.js';
import addressBookController from '../controller/addressBookController.js';
import orderController from '../controller/orderController.js';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    //API Test
    router.get('/api/test', testController.getTest);

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
    router.get('/api/get-product-sell-count', productController.getProductSellCount);
    router.get('/api/product-detail', productController.handleGetProductDetail);
    router.get('/api/search-product', productController.handleSearchProduct);


    //API Cart
    router.post('/api/store-cart-detail', cartController.saveCartDetail);
    router.get('/api/get-all-cart-detail', cartController.getAllCartDetail);
    router.put('/api/update-cart-detail', cartController.updateCartDetail);
    router.delete('/api/delete-cart-detail', cartController.deleteCartDetail);


    //API Store
    router.get('/api/get-store', cartController.getAllStore);

    //API address book
    router.get('/api/get-address-book', addressBookController.getAllAddressBook);
    router.post('/api/create-address-book', addressBookController.createAddressBook);
    router.delete('/api/delete-address-book', addressBookController.deleteAddressBook);

    //API ORDER
    router.post('/api/create-order', orderController.createOrder);
    router.get('/api/get-order', orderController.getListOrder);
    router.get('/api/get-order-notification', orderController.getListOrderNotification);
    router.get('/api/update-order-notification', orderController.updateOrderNotification);
    router.get('/api/search-order', orderController.searchOrder);



    return app.use("/", router);
}

module.exports = initWebRouter;