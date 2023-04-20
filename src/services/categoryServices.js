import db from "../models/index.js";



let handleGetCategory = () => {
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



module.exports = {
    handleGetCategory: handleGetCategory,

}