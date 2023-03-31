import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    return app.use("/", router);
}

module.exports = initWebRouter;