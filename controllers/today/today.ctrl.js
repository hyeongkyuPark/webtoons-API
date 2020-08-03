const axios = require("axios");
const cheerio = require("cheerio");

exports.getTodayToon = ((request, response) => {


    const getHtml = async () => {
        try {
            return await axios.get("https://comic.naver.com/xml/mainTopXml.nhn?order=user&null");
        } catch (error) {
            console.error(error);
        }
    };

    getHtml()
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("comics comic");

            $bodyList.each(function (i, elem) {
                ulList[i] = {
                    bigImg: $(this).find("bigImg").text(),
                    bigImgAlt: $(this).find("bigImgAlt").text(),
                    thumb: $(this).find("thumb").text(),
                    thumbAlt: $(this).find("thumbAlt").text(),
                    url: 'https://comic.naver.com'+$(this).find("url").text(),
                    index: $(this).find("index").text(),
                    ageRate: $(this).find("ageRate").text(),
                    site: 'naver'
                }
            });

            const data = ulList;
            return data;
        })
        .then(res => response.send(res));
});