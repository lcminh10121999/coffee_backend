import db from "../models/index.js";



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
            listCategory = await db.Category.findAll();
            if (listCategory) {
                resolve({
                    errCode: 0,
                    errMessage: "Get List Category Success",
                    category: listCategory,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get False",
                    category: listCategory,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}



module.export = {
    getProductList: getProductList,

}