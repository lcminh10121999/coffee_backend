import db from "../models/index.js";
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


let getProductList = (categoryId, productLimit, productOffset, sortColumn, sortType) => {
    let limit = Number(productLimit);
    let offset = Number(productOffset);
    let columnSort = sortColumn ? sortColumn : "id";
    // let columnSort = sortColumn;
    // if (columnSort) {
    //     columnSort = sortColumn
    // } else {
    //     columnSort = "id"
    // }
    let typeSort = sortType ? sortType : "ASC";
    // let typeSort = sortType;
    // if (!typeSort) {
    //     typeSort = "ASC"
    // }
    console.log("id", categoryId, "limit", limit, "offset", offset, "sortColumn", columnSort, "sortType", typeSort);
    return new Promise(async (resolve, reject) => {
        let listProduct = "";
        let detailProduct = "";
        try {
            if (categoryId === "ALL") {
                listProduct = await db.Product.findAll({
                    limit: limit,
                    offset: offset,
                    order: [
                        [columnSort, typeSort],

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
                        [columnSort, typeSort],
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


let handleGetProductSellCount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let productSellCount = await db.Product.findAll({
                limit: 6,
                order: [
                    ['count_sell', 'DESC'],
                ],
            })


            if (productSellCount) {
                resolve({
                    errCode: 0,
                    errMessage: "Get ProductSellCount Success",
                    productSellCount: productSellCount
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get ProductSellCount False",
                    productSellCount: []
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

let searchProduct = (keySearch, limitValue) => {
    return new Promise(async (resolve, reject) => {

        try {
            let resultSearch = []
            let limit = Number(limitValue);
            if (limit) {
                resultSearch = await db.Product.findAll({
                    where: {
                        name: { [Op.like]: "%" + keySearch + "%" }
                    },
                    limit: limit,
                    raw: false
                })
            } else {


                resultSearch = await db.Product.findAll({
                    where: {
                        name: { [Op.like]: "%" + keySearch + "%" }
                    },
                    raw: false
                })
                console.log("result: abc");
            }


            if (resultSearch.length !== 0) {
                resolve({
                    errCode: 0,
                    errMessage: "Search Product success",
                    result: resultSearch
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Search Product success but empty result",
                    result: []
                });
            }

        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    getProductList: getProductList,
    getProductByID: getProductByID,
    handleGetProductSellCount: handleGetProductSellCount,
    searchProduct: searchProduct
}



