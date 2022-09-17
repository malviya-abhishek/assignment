import {youtubeApiServiceTest} from "./youtubeApi.service.test.js"



function runTests(){
    try {
        youtubeApiServiceTest();
    } catch (error) {
        console.log("Test failed", error);
    }
}


runTests();