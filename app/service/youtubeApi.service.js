import { google } from "googleapis";
import { logger } from "../utility/logger.utility.js";
import moment  from "moment";

async function getVideos(apiKey, searchQuery, maxResults = 50, publishedAfter){
    const youtubeService = google.youtube({
        auth : apiKey,
        version: "v3"
    });

    if(!publishedAfter){
        publishedAfter = moment().subtract(60, "seconds");
    }

    const searchOptions = {
        part: ["snippet"],
        maxResults: maxResults,
        order: "date",
        q : searchQuery,
        relevanceLanguage : "en",
        publishedAfter : publishedAfter
    }
    
    try {
        const response = await youtubeService.search.list(searchOptions);
        const videos = response?.data?.items;
        return videos;
    } catch (err) {
        logger.error("Failed to fetch video", err);
    }
}


export {getVideos};
