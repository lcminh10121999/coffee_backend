import userServices from "../services/userServices.js";
import bcrypt from 'bcryptjs';

let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "missing input parameter"
        });
    }

    //check email exist
    let userData = await userServices.handleUserLogin(email, password);
    //check password

    //return uer info and access token
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

const handleGetAllUsers = async (req, res) => {

    let id = req.query.id; // All get all , id get single
    let limit = req.query.limit // limit number user
    let offset = 0 + (req.query.page - 1) * limit;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing Parameters",
            users: []
        });
    }

    let users = await userServices.getAllUsers(id, limit, offset);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: "success",
        users
    });
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}