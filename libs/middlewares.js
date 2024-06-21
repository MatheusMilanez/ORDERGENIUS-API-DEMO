var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var compression = require("compression");
var logger = require("./logger.js");



module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(cors({
        origin:"http://localhost:3001",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    })
    app.use(express.static("public"));
    app.use('/images', express.static(('uploads')));

}

