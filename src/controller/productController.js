import productServices from "../services/productServices.js";
import db from "../models/index";
import categoryServices from "../services/categoryServices";



let handleGetProduct = async (req, res) => {
    let id = req.query.id; // All get all , id get single
    let limit = req.query.limit // limit number user
    let offset = 0 + (req.query.page - 1) * limit;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Ttruyền thiếu Id",
            product: []
        });
    } else {
        let productData = await productServices.getProductList(id, limit, offset);
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
        console.log("productDetail_2", productDetail);
        return res.status(200).json(productDetail);
    }
}

module.exports = {
    handleGetProduct: handleGetProduct,
    handleGetProductDetail: handleGetProductDetail
}