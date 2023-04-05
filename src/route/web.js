import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController"
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
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    return app.use("/", router);
}

module.exports = initWebRouter;