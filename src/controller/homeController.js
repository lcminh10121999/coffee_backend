import db from "../models/index";
import CRUDservices from "../services/CRUDservices";
let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req, res) => {
    let mess = await CRUDservices.createNewUser(req.body)
    console.log(mess);
    return res.send("post crud server");
}

let displayCRUD = async (req, res) => {
    let dataUser = await CRUDservices.getAllUser();
    return res.render("displayCRUD.ejs", {
        dataUser: dataUser
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservices.getUserById(userId);
        console.log(userData);
        return res.render("editCRUD.ejs", {
            user: userData
        });
    } else {

        return res.send("edit view crud server");
    }
}

let putEditCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservices.updateUserDate(data);
    return res.render("displayCRUD.ejs", {
        dataUser: allUser
    });

}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;

    let allUser = await CRUDservices.deleteUserById(userId);

    return res.render("displayCRUD.ejs", {
        dataUser: allUser
    });
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD, postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    deleteCRUD: deleteCRUD,
};