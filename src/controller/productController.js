import productServices from "../services/productServices.js";
import db from "../models/index";
import categoryServices from "../services/categoryServices";



let handleGetProduct = async (req, res) => {
    let id = req.query.id; // All get all , id get single
    let limit = req.query.limit // limit number user
    let offset = 0 + (req.query.page - 1) * limit;
    let sortColumn = req.query?.sortColumn;
    let sortType = req.query?.sortType;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Ttruyền thiếu Id",
            product: []
        });
    } else {
        let productData = await productServices.getProductList(id, limit, offset, sortColumn, sortType);
        return res.status(200).json(productData);
    }
}
let handleGetProductDetail = async (req, res) => {
    let id = req.query.id;


    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Ttruyền thiếu Id",
            product: []
        });
    } else {
        let productDetail = await productServices.getProductByID(id);
        return res.status(200).json(productDetail);
    }
}

let getProductSellCount = async (req, res) => {

    let productSellCount = await productServices.handleGetProductSellCount();


    return res.status(200).json(productSellCount);


}


let handleSearchProduct = async (req, res) => {
    let limit = req.query?.limit;
    console.log("limit", limit);
    let term = req.query;
    term = term.key.toLowerCase();
    let result = await productServices.searchProduct(term, limit);
    return res.status(200).json(result);
}

module.exports = {
    handleGetProduct: handleGetProduct,
    handleGetProductDetail: handleGetProductDetail,
    getProductSellCount: getProductSellCount,
    handleSearchProduct: handleSearchProduct
}