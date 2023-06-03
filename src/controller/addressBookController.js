import db from "../models/index.js";
import addressBookServices from "../services/addressBookServices.js";





let getAllAddressBook = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing data",
            carUser: []
        });
    } else {
        let cartDetail = await addressBookServices.handleGetAllAddressBookById(id);
        console.log("cartDetail", cartDetail);
        return res.status(200).json(cartDetail);
    }
}

let createAddressBook = async (req, res) => {
    let data = req.body
    let addressCreate = await addressBookServices.handleCreateAddressBook(data);
    return res.status(200).json(addressCreate);
}

let deleteAddressBook = async (req, res) => {
    let id = req.body.id;
    console.log("deleteAddressBook", req.body);
    let deleteAddressBook = await addressBookServices.handleDeleteAddressBook(id)

    return res.status(200).json(deleteAddressBook);
}



module.exports = {
    deleteAddressBook: deleteAddressBook,
    getAllAddressBook: getAllAddressBook,
    createAddressBook: createAddressBook

}