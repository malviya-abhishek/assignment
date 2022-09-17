import {mongoose} from "../service/mongoose.service.js";

const videoSchema = new mongoose.Schema({
    title: { type: String },
    description : {type : String},
    channelId: {type : String},
    channelTitle : { type : String },
    publishingDateTime : {type : Date},
    thumbnails : {
        default : {
            url : {type : String},
            width : {type: Number},
            height : {type : Number}
        },
        medium : {
            url : {type : String},
            width : {type: Number},
            height : {type : Number}
        },
        high : {
            url : {type : String},
            width : {type: Number},
            height : {type : Number}
        }
    },
    videoId : { type : String}
},{
    timestamps : true
});

const Video = mongoose.model("Video", videoSchema);
export {Video};