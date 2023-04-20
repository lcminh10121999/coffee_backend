import db from "../models/index.js";



let getProductList = (categoryId, productLimit, productOffset) => {
    let limit = Number(productLimit);
    let offset = Number(productOffset);
    console.log("id", categoryId, "limit", limit, "offset", offset);
    return new Promise(async (resolve, reject) => {
        let listProduct = "";
        let detailProduct = "";
        try {

            if (categoryId === "ALL") {
                listProduct = await db.Product.findAll({
                    limit: limit,
                    offset: offset,
                    order: [
                        ['id', 'ASC'],

                    ]
                });
                if (listProduct) {
                    resolve({
                        errCode: 0,
                        errMessage: "Get List Product Success",
                        product: listProduct,
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Get False",
                        product: listProduct,
                    });
                }
            } else {
                detailProduct = await db.Product.findAll({
                    where: { category_id: categoryId },
                    limit: limit,
                    offset: offset,
                    order: [
                        ['id', 'DESC'],
                    ]
                });
                if (detailProduct) {
                    resolve({
                        errCode: 3,
                        errMessage: "Get List Product Success",
                        product: detailProduct,
                    });
                } else {
                    resolve({
                        errCode: 4,
                        errMessage: "Get False",
                        product: detailProduct,
                    });
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getProductByID = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productDetail = await db.Product.findOne({
                where: {
                    id: productId
                },
                include: [
                    {
                        model: db.Category,
                        attributes: ["id", "name"]
                    },
                    {

                        model: db.Size,
                        as: "productSizeData",
                        // model: db.Size_Product,
                        // include: {
                        //     model: db.Size,
                        //     as: "productSizeData"
                        // }
                        through: {
                            attributes: []
                        },
                    },
                    {

                        model: db.Topping,
                        as: "productToppingData",
                        // model: db.Size_Product,
                        // include: {
                        //     model: db.Size,
                        //     as: "productSizeData"
                        // }
                        through: {
                            attributes: []
                        },
                    }
                ],

                raw: false,
                nest: true
            });
            resolve({
                errCode: 0,
                errMessage: "Get ProductDetail Success",
                productDetail: productDetail
            });
        } catch (error) {
            reject(error);
        }

    });
}

module.exports = {
    getProductList: getProductList,
    getProductByID: getProductByID
}



