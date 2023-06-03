import storeServices from "../services/storeServices.js";




let getAllStore = async (req, res) => {
    await storeServices.handleGetAllStore();
}


module.exports = {
    getAllStore: getAllStore
}