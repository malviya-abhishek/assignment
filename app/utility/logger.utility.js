// import { createLogger, format, transport } from "winston";
import { variables } from "./secrets.utility.js";
import winston from "winston";

const logLevels = {
    fatal : 0,
    error : 1,
    warn : 2,
    info : 3,
    debug: 4,
    trace : 5,
};

const  logger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: "apis"},
    transports : [ 
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "complete.log" })
    ],
});

if(variables.NODE_ENV != "prod"){
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    );
}

export {logger};