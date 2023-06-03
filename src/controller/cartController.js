import db from "../models/index.js";
import cartServices from "../services/cartServices.js";



let saveCartDetail = async (req, res) => {
    let data = req.body;

    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing data",
            carUser: []
        });
    } else {
        let cartDetail = await cartServices.handleStoreCartDetail(data);
        return res.status(200).json(cartDetail);
    }


}

let getAllCartDetail = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing data",
            carUser: []
        });
    } else {
        let cartDetail = await cartServices.handleGetAllCartDetail(id);
        return res.status(200).json(cartDetail);
    }
}


let updateCartDetail = async (req, res) => {
    let data = req.body;
    // console.log("data2", data2);

    if (!data.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing data",
            carUser: []
        });
    } else {
        let cartDetail = await cartServices.handleUpdateCartDetail(data);
        console.log(cartDetail);
        return res.status(200).json(cartDetail);
    }

}

let deleteCartDetail = async (req, res) => {
    let id = req.body.id;
    console.log("id", id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id",

        });
    } else {
        let response = await cartServices.handleDeleteCartDetail(id);
        return res.status(200).json(response)
    }


}

let getAllStore = async (req, res) => {
    let listStore = await cartServices.handleGetAllStore();
    return res.status(200).json(listStore)
}

module.exports = {
    saveCartDetail: saveCartDetail,
    getAllCartDetail: getAllCartDetail,
    updateCartDetail: updateCartDetail,
    deleteCartDetail: deleteCartDetail,
    getAllStore: getAllStore
}