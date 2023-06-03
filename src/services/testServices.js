import db from "../models/index.js";
import emailServices from "./emailServices.js";


let getProductList = () => {
    // return new Promise(async (resolve, reject) => {
    //     let listProduct = "";
    //     try {
    //         // resolve({
    //         //     errCode: 0,
    //         //     errMessage: "Get List Product Success",
    //         //     product: listProduct
    //         // });
    //         listProduct = await db.Product.findAll();
    //         if (listProduct) {
    //             resolve({
    //                 errCode: 0,
    //                 errMessage: "Get List Product Success",
    //                 product: listProduct
    //             });
    //         } else {
    //             resolve({
    //                 errCode: 1,
    //                 errMessage: "Get List Product False",
    //                 product: []
    //             });
    //         }
    //     } catch (error) {
    //         reject(error);
    //     }
    // });
    return new Promise(async (resolve, reject) => {
        let listCategory = "";
        try {
            await emailServices.checkSimpleMail("lcminh10121999@gmail.com")
            resolve({
                errCode: 1,
                errMessage: "Get success",

            });
            // listCategory = await db.Category.findAll();
            // if (listCategory) {
            //     resolve({
            //         errCode: 0,
            //         errMessage: "Get List Category Success",
            //         category: listCategory,
            //     });
            // } else {
            //     resolve({
            //         errCode: 1,
            //         errMessage: "Get False",
            //         category: listCategory,
            //     });
            // }
        } catch (error) {
            reject(error);
        }
    });
}
let handleGetAllStore = () => {

    return new Promise(async (resolve, reject) => {
        console.log("abv");
        try {
            let storeList = db.Store.findAll()
            if (storeList) {
                resolve({
                    errCode: 0,
                    errMessage: "Get List Store Success",
                    store: storeList,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get List Store False",
                    store: storeList,
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}


module.export = {
    getProductList: getProductList,
    handleGetAllStore: handleGetAllStore

}