import express from "express";
import cors from "cors";
import { variables } from "./app/utility/secrets.utility.js";
import { logger } from "./app/utility/logger.utility.js";
import bodyParser  from "body-parser";
import { routesConfig as videoRoutesConfig } from "./routes/routes.api.video.js";
import { periodicYoutubeApiCaller } from "./app/service/periodicYouTubeApiCaller.service.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


// Logger setup
app.use( (req, res, next)=>{
    const message = req.method + " " + req.originalUrl;
    logger.info( message );
    next();
});


app.get("/health-check", (req, res)=>{
    res.status(200).send();
});

videoRoutesConfig(app);


app.listen( variables.PORT, ()=>{
    periodicYoutubeApiCaller("cricket").start();
    logger.info("Server started at " + variables.PORT)
});