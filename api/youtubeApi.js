const {google} = require('googleapis');
const service = google.youtube({
    version: 'v3',
    //auth: 'AIzaSyA3a9ExNfA-NhouM3ixH1aoyezlOuqlI5c' //flo
    auth: 'AIzaSyBZKfPOQxbK2XFhzdRnunw-UegYc2OSesM' //cyan
})

async function TendanceVideos() {
    return new Promise((resolve, reject) => {
        const res = service.videos.list({
            part: "snippet",
            chart: 'mostPopular',
            regionCode: "FR",
            maxResults: 40
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const videos = res.data.items;
            if (videos.length) {
                const o = {} // empty Object
                let i = 0;
                videos.map((video) => {
                    const data = {
                        title: video.snippet.title,
                        id: video.id,
                        link: "https://www.youtube.com/watch?v=" + video.id,
                        miniature: video.snippet.thumbnails["medium"].url
                    }
                    if (video.id !== undefined) {
                        o[i] = data;
                        i++;
                    }
                });
                resolve(o)
            } else {
                reject('No videos founds.');
            }
        })
    });
}

async function searchVideos(name) {
    return new Promise((resolve, reject) => {
        const res = service.search.list({
            "part": [
                "snippet"
            ],
            "regionCode": "FR",
            "chart": 'mostPopular',
            "q": name,
            "maxResults": 40,
            "order": "viewCount",
            "relevanceLanguage": "FR",


        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const videos = res.data.items;
            if (videos.length) {
                const o = {} // empty Object
                let i = 0;
                videos.map((video) => {
                    const data = {
                        title: video.snippet.title,
                        id: video.id.videoId,
                        link: "https://www.youtube.com/watch?v=" + video.id.videoId,
                        miniature: video.snippet.thumbnails["medium"].url
                    }
                    if (video.id.videoId !== undefined) {
                        o[i] = data;
                        i++;
                    }
                });
                resolve(o)
            } else {
                reject('No videos founds.');
            }
        })
    });
}

async function getVideoByIdVideo(IdVideo) {
    return new Promise((resolve, reject) => {
        const res = service.videos.list({
            "part": [
                "snippet"
            ],
            "id": IdVideo
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const videos = res.data.items;
            if (videos.length) {
                const data = {
                    title: videos[0].snippet.title,
                    id: IdVideo,
                    link: "https://www.youtube.com/watch?v=" + IdVideo,
                    miniature: videos[0].snippet.thumbnails["medium"].url
                }
                resolve(data)
            } else {
                reject("No Tag")
            }
        })
    });
}

async function getTagsByIdVideo(IdVideo) {
    return new Promise((resolve, reject) => {
        const res = service.videos.list({
            "part": [
                "snippet"
            ],
            "id": IdVideo
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const videos = res.data.items;
            if (videos.length) {
                //console.log(videos[0].snippet.tags)
                resolve(videos[0].snippet.tags)
            } else {
                reject("No Tag")
            }
        })
    });
}


module.exports = {searchVideos, getTagsByIdVideo, getVideoByIdVideo,TendanceVideos}

//main().catch(console.error);

