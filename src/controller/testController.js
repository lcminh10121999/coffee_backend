import db from "../models/index";
import storeServices from "../services/storeServices.js";
import testServices from "../services/testServices.js";


let getTest = async (req, res) => {

    let data = await testServices.getProductList();



    return res.status(200).json(data);
}

let getAllStore = async (req, res) => {
    await testServices.getProductList();
}

module.exports = {
    getTest: getTest,
    getAllStore: getAllStore
}






