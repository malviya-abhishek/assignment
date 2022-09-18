import mongoose from "mongoose";
import { variables } from "../utility/secrets.utility.js";
import { logger } from "../utility/logger.utility.js"

const options = {
	// autoIndex: false,
	// useNewUrlParser: true,
	// useUnifiedTopology: true,
    // createIndexes : false
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

const connectWithRetry = ()=>{
    const retryIn = 3000;
    logger.info("Trying to connect to database")
    mongoose.connect( variables.MONGODB_URI , options)
    .then( ()=>{
        logger.info("Connected to database")

    })
    .catch( err => {
        logger.error("Failed to connect to database", err);
        logger.info("Trying again in " + retryIn );
        setTimeout(connectWithRetry, retryIn);
    })
}


connectWithRetry();

export { mongoose } ;