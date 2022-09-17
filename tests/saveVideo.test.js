import {periodicFunHelper} from "../app/service/periodicYoutubeApiCaller.service.js";
import {testLogger} from "../app/utility/logger.utility.js";




async function saveVideoTest(){
    try{
        await periodicFunHelper("cricket");
        testLogger.info("saveVideoTest passed");
        return true;
    }
    catch (error){
        testLogger.error("Save video test failed", error);
        return false;
    }
}


export {saveVideoTest}



