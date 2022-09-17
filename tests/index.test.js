import { testLogger } from "../app/utility/logger.utility.js";

import {youtubeApiServiceTest} from "./youtubeApi.service.test.js"
import {periodicYouTubeApiCallerTest} from "./periodicYoutubeCaller.test.js"
import { saveVideoTest } from "./saveVideo.test.js"



async function runTests(){
    let totalTest = 0;
    let testPassed = 0;

    if( await youtubeApiServiceTest() && ++totalTest ) testPassed++;
    if( await periodicYouTubeApiCallerTest() && ++totalTest) testPassed++;
    if( await saveVideoTest() && ++totalTest ) testPassed++;
    
    let result  = "Test passed "  + testPassed + " / " + totalTest;
    testLogger.info(result); 
}


runTests();