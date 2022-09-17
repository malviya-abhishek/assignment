import { variables } from "../app/utility/secrets.utility.js";
import { getVideos } from "../app/service/youtubeApi.service.js";


async function youtubeApiServiceTest(){
    try {
        let maxResults = 20;
        let videos = await getVideos(variables.YOUTUBE_APIKEY, "cricket", maxResults);
        console.log("test response ", videos);
        if(videos.length === maxResults){
            console.log("Test passed");
        }
        else
            throw new Error("Incorrect number of videos fetched");

    } catch (error) {
        console.log("Youtube api service failed", error);
    }
}


export {youtubeApiServiceTest};