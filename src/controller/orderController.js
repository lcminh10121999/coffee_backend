import db from "../models/index.js";
import orderServices from "../services/orderServices.js";





let createOrder = async (req, res) => {
    let data = req.body;


    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing data",
            carUser: []
        });
    } else {
        let cartDetail = await orderServices.handleCreateOrder(data);
        return res.status(200).json(cartDetail);
    }
}

let getListOrder = async (req, res) => {

    let idUser = req.query.id;
    let limit = req.query.limit
    let offset = 0 + (req.query.page - 1) * limit;
    let result = await orderServices.handleGetListOrder(idUser, limit, offset);
    return res.status(200).json(result);
}

let getListOrderNotification = async (req, res) => {
    let result = await orderServices.handleGetListOrderNotification();
    return res.status(200).json(result);
}

let updateOrderNotification = async (req, res) => {
    let result = await orderServices.handleUpdateOrderNotification();
    return res.status(200).json(result);
}
let searchOrder = async (req, res) => {

    let startDate = req.query?.startDate
    let endDate = req.query?.endDate
    let keySearch = req.query?.keySearch
    let idUser = req.query.id;
    let limit = req.query.limit
    let offset = 0 + (req.query.page - 1) * limit;
    let result = await orderServices.handleSearchOrder(startDate, endDate, keySearch, idUser, limit, offset);
    return res.status(200).json(result);
}

module.exports = {
    getListOrder: getListOrder,
    createOrder: createOrder,
    getListOrderNotification: getListOrderNotification,
    updateOrderNotification: updateOrderNotification,
    searchOrder: searchOrder
}