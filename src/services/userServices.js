import bcrypt from 'bcryptjs';
import db from "../models/index.js";



const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {

        try {
            let userData = {};
            let isExist = await handleCheckEmail(userEmail);
            if (isExist) {

                // check password
                let user = await db.User.findOne({
                    where: {
                        email: userEmail
                    },
                    raw: true,
                    // attributes: {
                    //     include: ['email'], // define columns that you want to show
                    //     exclude: [] // define columns that you don't want 
                    // }
                });
                if (user) {
                    let check = await bcrypt.compareSync(userPassword, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Login success`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Sai password`;

                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Email không tồn tại`;

                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Email không tồn tại`;

            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}
let handleCheckEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    });
}

let compareUserPassWord = () => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (error) {
            reject(error)
        }
    })
}



let getAllUsers = (userId, limitUser, offsetUser) => {
    return new Promise(async (resolve, reject) => {
        let user = "";
        let limit = Number(limitUser);
        let offset = Number(offsetUser);
        try {
            if (userId === "ALL") {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                    limit: limit,
                    offset: offset,
                    order: [
                        ['id', 'DESC'],
                    ]
                });
            } else if (userId && userId !== "ALL") {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(user);
        } catch (error) {
            reject(error);
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let check = await handleCheckEmail(data.email);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "This is email already Exist"
                });
            } else {
                let hashUserPassWordFromBcrypt = await hashPassWordUser(data.password);
                const newUser = await db.User.create({
                    email: data.email,
                    password: hashUserPassWordFromBcrypt,
                    name: data.name,
                    birthday: data.birthday,
                    phone: data.phone,
                    address: data.address,
                    status: data.status,
                    gender: data.gender,
                    role: data.role,
                    image: data.image,
                });

                await db.Cart.create({
                    user_id: newUser.id,
                    code: "KH-" + newUser.id
                })

                resolve({
                    errorCode: 0,
                    errorMessage: "success"
                });
            }

        } catch (error) {
            reject(error)
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `Người dùng không tồn tại`
                });
            } else {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    errMessage: `Xóa người dùng thành công`
                });
            }
        } catch (error) {
            reject(error);
        }

    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            console.log(data);
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `Người dùng không tồn tại`
                });
            } else {
                user.name = data.name;
                user.email = data.email;
                user.phone = data.phone;
                user.address = data.address;
                user.birthday = data.birthday;
                user.status = data.status;
                user.gender = data.gender;
                user.role = data.role;
                user.image = data.image;

                await user.save();

                let resUser = await db.User.findOne({
                    where: { id: data.id },
                    raw: true,
                });
                resolve({
                    errCode: 0,
                    errMessage: "cập nhật thành công",
                    user: resUser,
                });
            }
        } catch (error) {
            reject(error);
        }

    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleCheckEmail: handleCheckEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
};