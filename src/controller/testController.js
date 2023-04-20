import db from "../models/index";
import categoryServices from "../services/categoryServices";
import testServices from "../services/testServices.js";


let getTest = async (req, res) => {

    let data = await testServices.getProductList();

    console.log(data);

    return res.status(200).json(data);
}

module.exports = {
    getTest: getTest
}