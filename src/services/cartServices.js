import db from "../models/index.js";


let handleGetCartDetailById = async (id) => {
    let data = await db.Cart_Detail.findOne({
        where: {
            id: id
        },
        raw: false,
    });
    return data;
}


let handleStoreCartDetail = (data) => {
    return new Promise(async (resolve, reject) => {



        let getCartDetail = await db.Cart_Detail.findAll({
            where: {
                cart_id: data.cart_id
            },
            include: [
                {
                    model: db.Cart_Detail_Size,
                    as: "cartDetailSize",

                },
                {
                    model: db.Cart_Detail_Topping,
                    as: "cartDetailToping"
                },
            ],

            raw: false,
            nest: true
        });
        let oldCart = JSON.parse(JSON.stringify(getCartDetail));


        let newItemToCart = data;
        let check = false;
        let idUpdate = 0;
        if (oldCart.length !== 0) {
            await oldCart.map((item) => {
                if (item.product_id === newItemToCart.product_id) {

                    let checkNote = newItemToCart.note == item.note ? true : false;

                    let checkSize = (
                        newItemToCart.size.length === [item.cartDetailSize].length &&
                        [item.cartDetailSize].every((element_1) =>
                            newItemToCart.size.some(
                                (element_2) =>

                                    element_1.size_id === element_2.id
                            )
                        )
                    );


                    let checkTopping = (
                        newItemToCart.topping.length === item.cartDetailToping.length &&
                        item.cartDetailToping.every((element_1) =>
                            newItemToCart.topping.some(
                                (element_2) =>
                                    element_1.topping_id === element_2.id
                            )
                        )
                    );



                    if (checkSize && checkTopping && checkNote) {

                        // let idItemUpdate = item.id
                        // let carUser = updateOldItemToCart(data, idItemUpdate);
                        idUpdate = item.id;
                        check = true;

                    }




                }
            })

        }


        if (check) {
            await updateOldItemToCart(data, idUpdate);

        }
        else {
            await createNewItemToCart(data);

        }

        let carUser = await db.Cart_Detail.findAll({
            where: {
                cart_id: data.cart_id
            },
            include: [
                {
                    model: db.Cart_Detail_Size,
                    as: "cartDetailSize",

                },
                {
                    model: db.Cart_Detail_Topping,
                    as: "cartDetailToping"
                },
                {
                    model: db.Product,
                    as: "productCartDetailData"
                },
            ],

            raw: false,
            nest: true
        });
        resolve({
            errCode: 0,
            errMessage: "Get ProductDetail Success",
            carUser: carUser
        });
        try {
        } catch (error) {
            reject(error)
        }
    })
}



let handleGetAllCartDetail = (id) => {
    return new Promise(async (resolve, reject) => {

        let carUser = await db.Cart_Detail.findAll({
            where: {
                cart_id: id
            },
            include: [
                {
                    model: db.Cart_Detail_Size,
                    as: "cartDetailSize",

                },
                {
                    model: db.Cart_Detail_Topping,
                    as: "cartDetailToping"
                },
                {
                    model: db.Product,
                    as: "productCartDetailData"
                },
            ],

            raw: false,
            nest: true
        });



        resolve({
            errCode: 0,
            errMessage: "Get ProductDetail Success",
            carUser: carUser
        });
        try {
        } catch (error) {
            reject(error)
        }
    })
}


let createNewItemToCart = async (data) => {
    let cartDetail = await db.Cart_Detail.create({
        cart_id: data.cart_id,
        product_id: data.product_id,
        price: Number(data.price),
        total_price: Number(data.total_price),
        quantity: Number(data.quantity),
        note: data.note
    });
    await data.size.map(async (item) => {

        let cartDetailSize = await db.Cart_Detail_Size.create({
            cart_detail_id: cartDetail.id,
            size_id: item.id,
            name: item.name,
            price: Number(item.price)
        });
        return cartDetailSize
    });
    data.topping.map(async (item) => {
        let cartDetailTopping = await db.Cart_Detail_Topping.create({
            cart_detail_id: cartDetail.id,
            topping_id: item.id,
            name: item.name,
            price: Number(item.price)
        });
        return cartDetailTopping
    });
    let carUser = await db.Cart_Detail.findAll({
        where: {
            cart_id: data.cart_id
        },
        include: [
            {
                model: db.Cart_Detail_Size,
                as: "cartDetailSize",

            },
            {
                model: db.Cart_Detail_Topping,
                as: "cartDetailToping"
            },
        ],

        raw: false,
        nest: true
    });

    return carUser;
}

let updateOldItemToCart = async (data, idItemUpdate) => {
    let itemUpdate = await db.Cart_Detail.findOne({
        where: {
            id: idItemUpdate
        },
        raw: false,
    });

    itemUpdate.quantity = itemUpdate.quantity + data.quantity;
    itemUpdate.total_price = itemUpdate.total_price + data.total_price;

    await itemUpdate.save();


    let carUser = await db.Cart_Detail.findAll({
        where: {
            cart_id: data.cart_id
        },
        include: [
            {
                model: db.Cart_Detail_Size,
                as: "cartDetailSize",

            },
            {
                model: db.Cart_Detail_Topping,
                as: "cartDetailToping"
            },
        ],

        raw: false,
        nest: true
    });

    return carUser;
}

let handleUpdateCartDetail = (data) => {

    return new Promise(async (resolve, reject) => {

        try {

            let cartDetailData = await handleGetCartDetailById(data.id);
            cartDetailData.quantity = data.quantity;
            cartDetailData.total_price = data.total_price;

            await cartDetailData.save();

            let cartDetailDataAfterUpdate = await handleGetCartDetailById(data.id);

            resolve({
                errCode: 0,
                errMessage: "Update CartDetail Success",
                cartDetailDataAfterUpdate: cartDetailDataAfterUpdate
            });

        } catch (error) {
            reject(error)
        }
    });

}

let handleDeleteCartDetail = (id) => {
    return new Promise(async (resolve, reject) => {


        try {
            let cartItem = handleGetCartDetailById(id)
            console.log("cartItem", cartItem);

            if (!cartItem) {
                resolve({
                    errCode: 2,
                    errMessage: "Item doesn't exist",
                })
            } else {
                await db.Cart_Detail.destroy({
                    where: {
                        id: id
                    },
                    // include: [
                    //     {
                    //         model: db.Cart_Detail_Size,
                    //         as: "cartDetailSize",

                    //     },
                    //     {
                    //         model: db.Cart_Detail_Topping,
                    //         as: "cartDetailToping"
                    //     },
                    // ],
                    // raw: false
                })
                await db.Cart_Detail_Topping.destroy({
                    where: {
                        cart_detail_id: id
                    },


                })
                await db.Cart_Detail_Size.destroy({
                    where: {
                        cart_detail_id: id
                    },


                })
                resolve({
                    errCode: 0,
                    errMessage: "delete success",
                })
            }
        } catch (error) {
            reject(error)
        }
    });
}
let handleGetAllStore = () => {

    return new Promise(async (resolve, reject) => {

        try {
            let storeList = await db.Store.findAll({
                raw: true
            })

            if (storeList) {
                resolve({
                    errCode: 0,
                    errMessage: "Get List Store Success",
                    store: storeList,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get List Store False",
                    store: storeList,
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}



module.exports = {
    handleStoreCartDetail: handleStoreCartDetail,
    handleGetAllCartDetail: handleGetAllCartDetail,
    handleUpdateCartDetail: handleUpdateCartDetail,
    handleDeleteCartDetail: handleDeleteCartDetail,
    handleGetAllStore: handleGetAllStore
}