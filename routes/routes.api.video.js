import { getVideo } from "../app/http/controller/video/video.controller.js";



const routesConfig = function(app){
    app.get("/videos", [getVideo])
};


export {routesConfig};