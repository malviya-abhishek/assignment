import dotenv from "dotenv"
dotenv.config();

const variablesName = [
    "PORT", 
    "NODE_ENV", 
    "YOUTUBE_APIKEY", 
    "MONGODB_URI"
];

const variables = {};

variablesName.forEach( variable =>{
    let value  = process.env[variable];
    if(!value){
        console.log("Variable missing ->", variable);
        process.exit(-1);
    }
    else
        variables[variable] = value; 
});


export {variables};