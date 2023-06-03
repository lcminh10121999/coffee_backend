require("dotenv").config();

"use strict";
const nodemailer = require("nodemailer");




let checkSimpleMail = async (receiverEmail) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <lcm10121999@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}

let sendEmailOrder = async (data) => {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"The Coffee House👻" <lcm10121999@gmail.com>', // sender address
        to: data.dataSend.address.email, // list of receivers
        subject: "Đơn hàng", // Subject line
        // text: "Hello world?", // plain text body
        html: `<h3>Xin Chào Quý Khách ${data.dataSend.address.name}</h3>
        <br/>
        <p>Cảm ơn Quý Khách đã sử dụng dich vụ tại The Coffee House</p>
        <p>Quý Khách ${data.dataSend.address.name} đã đặt hàng thành công</p>
        <p>Mã đơn hàng: ${data?.dataOrder?.order_code}</p>
        <p>Số điện thoại người nhận: ${data?.dataOrder?.address?.phone} </p>
        <p>Địa chỉ người nhận: ${data?.dataSend?.address?.address} </p>
        <p>Tông giá trị đơn hàng: ${data?.dataSend?.total.toLocaleString()}đ</p>
        <br/>
        <h3>Quý khách có thể truy cập <a hef="http://localhost:3000/"> The Coffee House</a> để xem chi tiết đơn hàng</h3>
        <h3>Xin chân thành cảm ơn quý khách!</h3>
        <br/>
        <h3>The Coffee House C</h3>
        `, // html body

    });
}



module.exports = {
    checkSimpleMail: checkSimpleMail,
    sendEmailOrder: sendEmailOrder
}