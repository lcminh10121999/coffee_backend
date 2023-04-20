import db from "../models/index";
import categoryServices from "../services/categoryServices";



let getCategory = async (req, res) => {

    let categoryData = await categoryServices.handleGetCategory();

    console.log(categoryData);

    return res.status(200).json(categoryData);
}

module.exports = {
    getCategory: getCategory
}