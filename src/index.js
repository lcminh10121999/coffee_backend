import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectionDB from "./config/connectDB";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


viewEngine(app);
initWebRouter(app);

connectionDB();

let port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log("success" + port);
});