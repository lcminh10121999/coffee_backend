const db = require("../models");
const { Op } = require("sequelize");
const { sendEmailOrder } = require("./emailServices");

let handleCreateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            // data.itemBuy.map((item) => console.log(console.log(" data.itemBuy", item.cartDetailSize)))
            // console.log(" data.itemBuy.cartDetailSize",);

            // data.itemBuy.cartDetailSize.map(async (item) => {

            //     console.log(" item", item);
            // })


            let order = await db.Order.create({
                order_code: "TCH" + "-" + data.user_id,
                user_id: Number(data.user_id),
                status: 1,
                payment: data.paypal,
                total: data.total,
                name: data.address.name,
                address: data.address.address,
                phone: data.address.phone,
                store_id: data.store.id,

            });
            // create Order Code
            let today = new Date().toLocaleDateString().replaceAll('/', '');

            order.order_code = "CFH" + "-" + today + order.id;
            await order.save()
            // console.log("order", order);


            data?.itemBuy?.map(async (item) => {
                let orderDetail = await db.OrderDetail.create({
                    order_id: order.id,
                    product_id: Number(item?.product_id),
                    price: Number(item?.price),
                    quantity: Number(item?.quantity),
                    total_price: Number(item?.total_price),
                    note: item?.note
                })

                let Order_Detail_Size = await db.Order_Detail_Size.create({
                    order_id: orderDetail.id,
                    name: item?.cartDetailSize.name,
                    price: Number(item?.cartDetailSize.price),
                })






                await item.cartDetailToping?.map(async (i) => {
                    let Order_Detail_Topping = await db.Order_Detail_Topping.create({
                        order_id: orderDetail.id,
                        name: i?.name,
                        price: Number(i?.price),
                    })

                })






                let productCountSell = await db.Product.findOne({
                    where: {
                        id: item.product_id
                    },
                    raw: false,
                })
                productCountSell.count_sell = productCountSell.count_sell + 1;


                await productCountSell.save();







                await db.Cart_Detail.destroy({
                    where: {
                        id: item.id
                    }
                });
                await item.cartDetailToping.map(async (i) => {
                    await db.Cart_Detail_Topping.destroy({
                        where: {
                            cart_detail_id: i.id
                        },


                    })
                })

                await db.Cart_Detail_Size.destroy({
                    where: {
                        cart_detail_id: item.id
                    },



                })
                // console.log("data send mail", data);
                await sendEmailOrder({ dataSend: data, dataOrder: order })


            });
            resolve({
                errCode: 0,
                errMessage: "Order Success",
            });
        } catch (error) {
            reject(error)
        }
    });



}

let handleGetListOrder = (idUser, limit, offset) => {
    return new Promise(async (resolve, reject) => {
        let limitOrder = Number(limit);
        let offsetOrder = Number(offset);
        let listOrder = {};
        try {
            listOrder = await db.Order.findAll({
                where: {
                    user_id: idUser
                },
                limit: limitOrder,
                offset: offsetOrder,
                include: [
                    {
                        model: db.OrderDetail,
                        as: "orderDetail",
                        include: [
                            {

                                model: db.Order_Detail_Size,
                                as: "orderDetailSize",
                            },
                            {
                                model: db.Order_Detail_Topping,
                                as: "orderDetailTopping",
                            },
                            {
                                model: db.Product,
                                as: "orderDetailProduct",
                            },
                        ]
                    }


                ],
                order: [
                    ["id", "DESC"],
                ],
                raw: false,
                nest: true
            })
            console.log(listOrder);
            resolve({
                errCode: 0,
                errMessage: "success",
                listOrder: listOrder
            })



        } catch (error) {
            reject(error)
        }
    });
}

let handleGetListOrderNotification = () => {
    return new Promise(async (resolve, reject) => {
        let listOrder = []
        listOrder = await db.Order.findAll({
            where:
                { status: 1 }

        })

        let listOrderNotification = 0
        listOrderNotification = listOrder.length
        resolve({
            errCode: 0,
            errMessage: "success",
            listOrderNotification: listOrderNotification
        })

    })
}

let handleUpdateOrderNotification = () => {
    return new Promise(async (resolve, reject) => {
        let listOrder = []
        listOrder = await db.Order.findAll({
            where:
                { status: 1 }

        })
        let listOrderNotification = 0
        listOrderNotification = listOrder.length
        resolve({
            errCode: 0,
            errMessage: "success",
            listOrderNotification: listOrderNotification
        })

    })
}


let handleSearchOrder = (startDate, endDate, keySearch, idUser, limit, offset) => {
    return new Promise(async (resolve, reject) => {

        console.log("keySearch", keySearch, "startDate", startDate, "endDate", endDate);
        console.log("idUser", idUser);
        try {
            let limitOrder = Number(limit);
            let offsetOrder = Number(offset);
            let listOrder = []
            if (keySearch && ((!startDate && !endDate) || (startDate === 'undefined' && endDate === 'undefined'))) {
                console.log("listOrder 1");
                listOrder = await db.Order.findAll({
                    where: {
                        [Op.and]: {
                            user_id: idUser,
                            order_code: {
                                [Op.like]: "%" + keySearch + "%"
                            }
                        }
                    },
                    limit: limitOrder,
                    offset: offsetOrder,
                    include: [
                        {
                            model: db.OrderDetail,
                            as: "orderDetail",
                            include: [
                                {

                                    model: db.Order_Detail_Size,
                                    as: "orderDetailSize",
                                },
                                {
                                    model: db.Order_Detail_Topping,
                                    as: "orderDetailTopping",
                                },
                                {
                                    model: db.Product,
                                    as: "orderDetailProduct",
                                },
                            ]
                        }


                    ],
                    order: [
                        ["id", "DESC"],
                    ],
                    raw: false,
                    nest: true

                })
            } else if (!keySearch && ((startDate && endDate) || (startDate !== 'undefined' && endDate !== 'undefined'))) {
                console.log("listOrder 2");
                listOrder = await db.Order.findAll({
                    where: {
                        [Op.and]: {
                            user_id: idUser,
                            createdAt: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    },
                    limit: limitOrder,
                    offset: offsetOrder,
                    include: [
                        {
                            model: db.OrderDetail,
                            as: "orderDetail",
                            include: [
                                {

                                    model: db.Order_Detail_Size,
                                    as: "orderDetailSize",
                                },
                                {
                                    model: db.Order_Detail_Topping,
                                    as: "orderDetailTopping",
                                },
                                {
                                    model: db.Product,
                                    as: "orderDetailProduct",
                                },
                            ]
                        }


                    ],
                    order: [
                        ["id", "DESC"],
                    ],
                    raw: false,
                    nest: true


                })
            } else if (!keySearch && ((!startDate && !endDate) || (startDate === 'undefined' && endDate === 'undefined'))) {
                console.log("listOrder 3");
            } else if (keySearch && ((startDate && endDate) || (startDate !== 'undefined' && endDate !== 'undefined'))) {
                console.log("listOrder 4");
                listOrder = await db.Order.findAll({
                    where: {
                        [Op.and]: {
                            user_id: idUser,
                            createdAt: {
                                [Op.between]: [startDate, endDate]
                            },
                            order_code: {
                                [Op.like]: "%" + keySearch + "%"
                            }
                        }

                    },
                    limit: limitOrder,
                    offset: offsetOrder,
                    include: [
                        {
                            model: db.OrderDetail,
                            as: "orderDetail",
                            include: [
                                {

                                    model: db.Order_Detail_Size,
                                    as: "orderDetailSize",
                                },
                                {
                                    model: db.Order_Detail_Topping,
                                    as: "orderDetailTopping",
                                },
                                {
                                    model: db.Product,
                                    as: "orderDetailProduct",
                                },
                            ]
                        }


                    ],
                    order: [
                        ["id", "DESC"],
                    ],
                    raw: false,
                    nest: true

                })
            }




            console.log("listOrder 7", listOrder);
            if (listOrder.length !== 0) {
                resolve({
                    errCode: 0,
                    errMessage: "success",
                    listOrder: listOrder
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "empty list order",
                    listOrder: []
                })
            }

        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    handleCreateOrder: handleCreateOrder,
    handleGetListOrder: handleGetListOrder,
    handleUpdateOrderNotification: handleUpdateOrderNotification,
    handleGetListOrderNotification: handleGetListOrderNotification,
    handleSearchOrder: handleSearchOrder
}