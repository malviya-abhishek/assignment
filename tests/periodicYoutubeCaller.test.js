import { periodicYoutubeApiCaller } from "../app/service/periodicYouTubeApiCaller.service.js";
import {testLogger} from "../app/utility/logger.utility.js";

function periodicYouTubeApiCallerTest(){
    try {
        periodicYoutubeApiCaller("cricket").start();
        testLogger.info("periodic youtube api caller passed");
        return true;
    } catch (error) {
        testLogger.error("Periodic youtube caller failed", error)
        return false;
    }
}


export {periodicYouTubeApiCallerTest}