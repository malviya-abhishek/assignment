import express from "express";
import cors from "cors";
import { variables } from "./app/utility/secrets.utility.js";
import { logger } from "./app/utility/logger.utility.js";
import bodyParser  from "body-parser";
import { routesConfig as videoRoutesConfig } from "./routes/routes.api.video.js";
import { periodicYoutubeApiCaller } from "./app/service/periodicYoutubeApiCaller.service.js";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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


// serve static file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get("/health-check", (req, res)=>{
    res.status(200).json({
        "message" : "Working fine"
    });
});

videoRoutesConfig(app);


app.listen( variables.PORT, ()=>{
    // commented  to avoid using daily quota
    periodicYoutubeApiCaller("cricket").start();
    logger.info("Server started at " + variables.PORT)
});