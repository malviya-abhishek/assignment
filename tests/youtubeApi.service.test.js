import { variables } from "../app/utility/secrets.utility.js";
import { getVideos } from "../app/service/youtubeApi.service.js";
import {testLogger} from "../app/utility/logger.utility.js";


async function youtubeApiServiceTest(){
    try {
        let maxResults = 20;
        let videos = await getVideos(variables.YOUTUBE_APIKEY.split(",")[0], "cricket", maxResults);
        if(videos?.length === maxResults){
            testLogger.info("Test passed");
            testLogger.info( videos );
        }
        else
            throw new Error("Incorrect number of videos fetched");
        return true;
    } catch (error) {
        testLogger.error("Youtube api service failed", error);
        return false
    }
}


export {youtubeApiServiceTest};