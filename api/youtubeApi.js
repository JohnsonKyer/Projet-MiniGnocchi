const {google} = require('googleapis');
const service = google.youtube({
    version: 'v3',
    auth: 'AIzaSyA3a9ExNfA-NhouM3ixH1aoyezlOuqlI5c'
})

async function searchVideos(name) {
    return new Promise((resolve, reject) => {
        const res =  service.search.list({
            "part": [
                "snippet"
            ],
            "chart": 'mostPopular',
            "q": name,
            "maxResults": 10

        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const videos = res.data.items;
            if (videos.length) {
                const o = {} // empty Object
                let i =0;
                videos.map((video) => {
                    const data = {
                        title: video.snippet.title,
                        id : video.id.videoId,
                        link : "https://www.youtube.com/watch?v=" + video.id.videoId
                    }
                    if (video.id.videoId !== undefined){
                        o[i]=data;
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

module.exports = {searchVideos, getTagsByIdVideo}

//main().catch(console.error);

