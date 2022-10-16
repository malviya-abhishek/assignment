import {CronJob} from "cron"
import {loggerThirdParty} from "../utility/logger.utility.js";
import {getVideos} from "./youtubeApi.service.js";
import {variables} from "../utility/secrets.utility.js";
import {Video} from "../model/video.model.js";

export async function periodicFunHelper(searchQuery){
    loggerThirdParty.info("Periodic video fetcher running");
    try {
        const apiKeys = variables.YOUTUBE_APIKEY.split(",");
        let fetched = false;
        for(let key of apiKeys){
            try {
                if(fetched)
                    break;
                let videos = await getVideos(key, searchQuery, 20);    
                await Video.insertMany(videos, {ordered:false, silent: true});
                loggerThirdParty.info("Videos saved");
                fetched = true;
            } catch (error) {
                if(error.code == "11000"){
                    loggerThirdParty.error("Duplicate file are handled");
                    loggerThirdParty.info("Videos saved");
                    fetched = true;
                }
                else
                    loggerThirdParty.error("Some problem while saving video", error);
            }
        }
        if(fetched === false)
            throw new Error("Daily quota finshied");
            loggerThirdParty.info("Videos fetched");        
    } catch (error) {
        loggerThirdParty.error("Failed to fetch video", error);
    }
}

export function periodicYoutubeApiCaller(searchQuery){
    loggerThirdParty.info("periodicYoutubeApiCaller triggered");
    return new CronJob('* * * * * ', () => {  periodicFunHelper(searchQuery) } );
}

