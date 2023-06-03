
import db from "../models/index.js";


let handleGetAllAddressBookById = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            let addressBook = await db.Address_Book.findAll({
                where: {
                    user_id: id
                },
                raw: true
            })

            if (addressBook) {
                resolve({
                    errCode: 0,
                    errMessage: "Get List address Book Success",
                    addressBook: addressBook,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get List address Book False",
                    addressBook: addressBook,
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

let handleCreateAddressBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Address_Book.create({
                name: data.name,
                address: data.address,
                phone: data.phone,
                email: data.email,
                user_id: data.user_id,
                city_code: data.city_code,
                city_name: data.city_name,
                districts_code: data.districts_code,
                districts_name: data.districts_name,
                wards_code: data.wards_code,
                wards_name: data.wards_name,
                specific_address: data.specific_address
            })

            resolve({
                errCode: 0,
                errMessage: "Create new address Book Success",

            })
        } catch (error) {
            reject(error)
        }
    });
}

let handleDeleteAddressBook = (idAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("idAddress", idAddress);
            if (idAddress) {
                await db.Address_Book.destroy({
                    where: { id: idAddress }
                })
                resolve({
                    errCode: 0,
                    errMessage: "Delete Success",

                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Id",

                })
            }

        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    handleDeleteAddressBook: handleDeleteAddressBook,
    handleGetAllAddressBookById: handleGetAllAddressBookById,
    handleCreateAddressBook: handleCreateAddressBook

}