
import db from "../models/index.js";
let handleUserLogin = (userEmail, userPassword) => {

}
let handleCheckEmail = (userEmail) => {


    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })
        } catch (error) {

        }
    });
}


module.exports = {
    handleUserLogin: handleUserLogin,
    handleCheckEmail: handleCheckEmail,
};