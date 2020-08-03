const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async (url) => {
    return await axios.get(url);
}

exports.getNaverToon = ((request, response) => {
   const url = "https://comic.naver.com/webtoon/genre.nhn?genre=story";
    
    getHtml(url)
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("ul.img_list").children("li");
    
            $bodyList.each(function (i, elem) {
                if(i >= 20) {
                    return;
                }
                let title = '';
                        if($(this).find("dl dt a").attr('title').length > 7) {
                            title = $(this).find("dl dt a").attr('title').substr(0, 8) + '...';
                        } else {
                            title = $(this).find("dl dt a").attr('title');
                        }

                ulList[i] = {
                    title,
                    thumb: $(this).find("div.thumb a img").attr('src'),
                    url: "https://comic.naver.com" + $(this).find("div.thumb a").attr('href'),
                    artists: "글/그림 : " + $(this).find("dl dd.desc a").text(),
                    index: i+1
                }
            });
    
            const data = ulList;
            return data;
        })
        .then(res => response.send(res));
});

exports.getDaumToon = ((request, response) => {
    const url = 'http://webtoon.daum.net/data/pc/webtoon/list_average_score_ranking/serialized?timeStamp=1595373572483'
    
    getHtml(url)
                .then(res => {
                    const data = [];
                    for(let i=0; i<res.data.data.length; i++) {
                        let item = res.data.data[i];
                        let title = '';
                        if(item.title.length > 7) {
                            title = item.title.substr(0, 8) + '...';
                        } else {
                            title = item.title
                        }
                        let genres = '';
                        item.cartoon.genres.forEach((element, index, array) => {
                                if(index == 0) {
                                    genres += element.name;
                                } else {
                                    genres += ' / ' + element.name;
                                }
                        });
                        let artists = '';
                        item.cartoon.artists.forEach((element, index, array) => {
                            if(array[0].name == array[1].name) {
                                artists = '글/그림 : ' + element.name;
                            } else {
                                if(index == 0) {
                                    artists += '글/그림 : ' + element.name;
                                    if(element.name != element.penName) {
                                        artists += '('+ element.penName +')';
                                    }
                                } else {
                                    artists += element.name;
                                    if(element.name != element.penName) {
                                        artists += '('+ element.penName +')';
                                    }
                                }
                            }
                        });

                        data[i] = {
                            title,
                            thumb: item.thumbnailImage2.url,
                            url: "http://webtoon.daum.net/webtoon/view/"+item.nickname,
                            genres,
                            artists,
                            index: i+1

                        }
                    }
                    response.send(data);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false;
                });

});