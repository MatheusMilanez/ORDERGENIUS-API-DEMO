var fs = require("fs");
var winston = require("winston");


if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/app.log',
            maxsize: 1048576, // 1MB
            maxFiles: 10,
            handleExceptions: true
        })
    ],
    exitOnError: false
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
