import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import db from '../models/index';
import emailServices from "./emailServices.js";



let createNewUser = async (data) => {



    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPassWordFromBcrypt = await hashPassWordUser(data.password);
            await db.User.create({
                email: data.email,
                password: hashUserPassWordFromBcrypt,
                name: data.name,
                birthday: data.birthday,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                role: data.role
            });
            resolve("create success");
        } catch (e) {
            reject(e)
        }

    })

}

let hashPassWordUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }

    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await emailServices.checkSimpleMail("lcminh10121999@gmail.com")
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }


    })
}
let updateUserDate = (data) => {
    console.log("log data");
    console.log(data);

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })
            if (user) {
                user.name = data.name;
                user.email = data.email;
                user.phone = data.phone;
                user.address = data.address;

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            } else {
                resolve();
            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            let allUser = await db.User.findAll();
            resolve(allUser);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserDate: updateUserDate,
    deleteUserById: deleteUserById,
};