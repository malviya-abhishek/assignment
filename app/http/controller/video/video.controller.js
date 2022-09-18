import { Video } from "../../../model/video.model.js";



export async function getVideo(req, res) {
    let page = req.query.page ? Math.max( Number(req.query.page), 0) : 0;
    let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    let search = req.query.search ? req.query.search : null;

    let videos = null;

    if(search !== null){
        videos = await Video.fuzzySearch({
            query : search
        }).sort({ publishingDateTime: 'asc' });
    }
    else{
        videos = await Video
            .find()
            .sort({publishingDateTime : 'asc'})
            .skip(pageSize*page)
            .limit(pageSize);
    }
    
    res.status(200).json({
        videos
    });
}