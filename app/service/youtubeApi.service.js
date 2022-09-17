import { google } from "googleapis";
import { loggerThirdParty } from "../utility/logger.utility.js";
import moment  from "moment";

function videoFormatter(rawVideos){
    const videos = [];
    rawVideos.forEach(rawVideo => {
        videos.push({
            title: rawVideo.snippet.title,
            description: rawVideo.snippet.description,
            channelId : rawVideo.snippet.channelId,
            channelTitle : rawVideo.snippet.channelTitle,
            publishingDateTime : rawVideo.snippet.publishedAt,
            thumbnails : {
                default : rawVideo.snippet.thumbnails.default,
                medium : rawVideo.snippet.thumbnails.medium,
                high: rawVideo.snippet.thumbnails.high
            },
            videoId : rawVideo.id.videoId
        });
    });
    return videos;
}


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
        loggerThirdParty.info("Video fetched from api");
        return videoFormatter(videos);
    } catch (err) {
        loggerThirdParty.error("Failed to fetch video", err);
    }
}


export {getVideos};
