import {CronJob} from "cron"
import {loggerThirdParty} from "../utility/logger.utility.js";
import {getVideos} from "./youtubeApi.service.js";
import {variables} from "../utility/secrets.utility.js";

async function periodicFun(searchQuery){
    try {
        let videos = await getVideos(variables.YOUTUBE_APIKEY, searchQuery, 20);
        loggerThirdParty.info("Videos fetched", videos);
        
    } catch (error) {
        loggerThirdParty.error("Failed to fetch video", error);
    }
}

function periodicYoutubeApiCaller(searchQuery){
    return new CronJob('* * * * * ', () => {  periodicFun(searchQuery) } );
}


export {periodicYoutubeApiCaller};