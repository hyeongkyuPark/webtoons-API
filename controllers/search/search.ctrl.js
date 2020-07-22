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
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3)
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
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3)
                };
            });

            const data = ulList.filter(n => (n.title).indexOf(searchTitle) != -1);
            return data;
        })
        .then(res => response.send(res));
});


exports.search_weekDay = ((request, response) => {
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
                    weekDay: ($(this).find('a.title').attr('href')).slice(-3)
                };
            });

            const data = ulList.filter(n => n.weekDay == searchWeekDay);
            return data;
        })
        .then(res => response.send(res));
});