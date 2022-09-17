import {youtubeApiServiceTest} from "./youtubeApi.service.test.js"
import {periodicYouTubeApiCallerTest} from "./periodicYoutubeCaller.test.js"
import { testLogger } from "../app/utility/logger.utility.js";


function runTests(){
    let totalTest = 2;
    let testPassed = 0;

    if(youtubeApiServiceTest()) testPassed++;
    if(periodicYouTubeApiCallerTest()) testPassed++;
    
    let result  = "Test passed "  + testPassed + " / " + totalTest;
    testLogger.info(result); 
}


runTests();