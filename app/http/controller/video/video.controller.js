import { Video } from "../../../model/video.model.js";
import { logger } from "../../../utility/logger.utility.js";



export async function getVideo(req, res) {
    let page = req.query.page ? Math.max( Number(req.query.page), 0) : 0;
    let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    let search = req.query.search ? req.query.search : null;

    let videos = [];
    let totalCount = 0;
    let totalPages = 0;

    try {

        totalCount = await Video.estimatedDocumentCount();
        totalPages = Math.ceil(totalCount / pageSize);  

        
        if(search !== null){
            videos = await Video.fuzzySearch({
                query : search
            })
            .sort({ publishingDateTime: 'asc' })
            .skip(pageSize*page)
            .limit(pageSize);
        }
        else{
            videos = await Video
                .find()
                .sort({publishingDateTime : 'asc'})
                .skip(pageSize*page)
                .limit(pageSize);
        }    
    } catch (error) {
        logger.error("Failed while serving videos", error);
    }


    
    
    res.status(200).json({
        page,
        totalCount,
        totalPages,
        videos
    });
}