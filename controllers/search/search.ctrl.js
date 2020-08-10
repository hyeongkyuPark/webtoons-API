const axios = require("axios");
const cheerio = require("cheerio");


exports.search_all = ((request, response) => {
    const getHtml = async () => {
        try {
            return await axios.get("https://comic.naver.com/webtoon/weekday.nhn");
        } catch (error) {
            console.error(error);
        }
    };
    
    getHtml()
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.col_inner ul").children("li");


            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('a.title').text(),
                    url: "https://comic.naver.com" + $(this).find('a.title').attr('href'),
                    imgUrl: $(this).find('div.thumb > a > img').attr('src'),
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3),
                    checked: false,
                    index: i
                };
            });

            const data = ulList.filter(n => n.title);
            return data;
        })
        .then(res => response.send(res));
});


exports.search_title = ((request, response) => {
    const searchTitle = request.param('title');

    const getHtml = async () => {
        try {
            return await axios.get("https://comic.naver.com/webtoon/weekday.nhn");
        } catch (error) {
            console.error(error);
        }
    };

    getHtml()
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.col_inner ul").children("li");


            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('a.title').text(),
                    url: "https://comic.naver.com" + $(this).find('a.title').attr('href'),
                    imgUrl: $(this).find('div.thumb > a > img').attr('src'),
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3),
                    checked: false
                };
            });

            const data = ulList.filter(n => (n.title).indexOf(searchTitle) != -1);
            return data;
        })
        .then(res => response.send(res));
});


exports.search_weekDay = (async (request, response) => {
    const searchWeekDay = request.param('weekDay');

    const getHtml = async () => {
        try {
            return await axios.get("https://comic.naver.com/webtoon/weekday.nhn");
        } catch (error) {
            console.error(error);
        }
    };

    getHtml()
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.col_inner ul").children("li");


            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    title: $(this).find('a.title').text(),
                    url: "https://comic.naver.com" + $(this).find('a.title').attr('href'),
                    imgUrl: $(this).find('div.thumb > a > img').attr('src'),
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3),
                    checked: false
                };
            });

            const data = ulList.filter(n => n.weekDay == searchWeekDay);
            return data;
        })
        .then(res => response.send(res));
});

exports.search_one = ((request, response) => {
    
const getHtml = async () => {
    try {
        return await axios.get(request.body.url);
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        const $ = cheerio.load(html.data);
        
          let data = {
                writer: $('.wrt_nm').text().replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣 |\/|0-9|a-z|A-Z]/g, ''),
                genre: $('.genre').text(),
                age: $('.age').text(),
                description: $('.detail > p').first().text()
            };

            return data;
    })
    .then(res => response.send(res));
});

exports.detail = (async (request, response) => {
    async function pageTest(url, ulList) {

        await axios.get(url)
            .then(html => {
                const $ = cheerio.load(html.data);
                const $bodyList = $("tbody > tr").not("[class^='band']");

                $bodyList.each(function (i, elem) {
                    ulList.push({
                        thumb: $(this).find('td').first().find('img').attr('src'),
                        title: $(this).find('td.title > a').text(),
                        url: 'https://comic.naver.com' + $(this).find('td.title > a').attr('href'),
                        date: $(this).find('td.num').text(),
                        num: /\&[a-z | A-Z]*=(\d*)/g.exec('https://comic.naver.com' + $(this).find('td.title > a').attr('href'))[1]
                    });
                });

                return ulList;
            });
    }

    async function test(url) {

        let count = await axios.get(url)
            .then(html => {
                const $ = cheerio.load(html.data);

                const url = $("tbody > tr").not("[class^='band']").first().find('td.title > a').attr('href');

                let data = /\&[a-z | A-Z]*=(\d*)/g.exec(url)[1];

                return data;
            });

        let ulList = [];

        for (let i = 1; i <= Math.ceil(count / 10); i++) {
            console.log(url + '&page=' + i);
            await pageTest(url + '&page=' + i, ulList);
        }

        response.send(ulList);

    }


    let url = request.param('url');

    if(url) {
        test(url);
    } else {
        response.send('hi')
    }

});