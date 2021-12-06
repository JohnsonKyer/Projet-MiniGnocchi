const { google } = require('googleapis');
const service = google.youtube({
    version: 'v3',
    //auth: 'AIzaSyA3a9ExNfA-NhouM3ixH1aoyezlOuqlI5c' //flo
    auth: 'AIzaSyBZKfPOQxbK2XFhzdRnunw-UegYc2OSesM' //cyan
})

async function getTrendingYoutubeVideos() {
    try {
        const response = await service.videos.list({
            part: "snippet",
            chart: 'mostPopular',
            regionCode: "FR",
            maxResults: 10,
        });

        const titles = response.data.items.map((item) => item.snippet.title);
        const urlVideos = response.data.items.map((item) => item.id);
        const channels = response.data.items.map((item) => item.snippet.channelTitle);
        const urlChannels = response.data.items.map((item) => item.snippet.channelId);
        const dates = response.data.items.map((item) => item.snippet.publishedAt);
        const thumbnails = response.data.items.map((item) => item.snippet.thumbnails.high.url);
        const descriptions = response.data.items.map((item) => item.snippet.description);

        var allVideos = []
        for (var i = 0; i < titles.length; i++) {
            allVideos.push({
                id: urlVideos[i],
                title: titles[i],
                urlVideo: 'https://www.youtube.com/watch?v=' + urlVideos[i],
                channel: channels[i],
                urlChannel: 'https://www.youtube.com/c/' + urlChannels[i],
                date: dates[i],
                thumbnail: thumbnails[i],
                description: descriptions[i],
                provider: 'youtube'
            });
        }

        return ['ok', allVideos];
    }
    catch (err) {
        console.log(err);
        return ['error', err];
    }
}
async function TendanceVideos(name) {
    return new Promise((resolve, reject) => {
        const res = service.videos.list({
            "part": [
                "snippet"
            ],
            "regionCode": "FR",
            "chart": 'mostPopular',
            "maxResults": 40,
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


module.exports = { searchVideos, getTagsByIdVideo, getVideoByIdVideo }

//main().catch(console.error);

