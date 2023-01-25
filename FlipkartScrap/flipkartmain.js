const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const getDetails = require("./flipkartfile");

function scrapFlipkart(url,productName){
    //console.log(url);
    request(url, cb);

    function cb(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            getTopicLinks(html,productName);
        }
    }

    function getTopicLinks(html,productName) {
        let $ = cheerio.load(html);

        // div class price class="_30jeq3 _1_WHN1
        // div original price = class="_3I9_wc _27UcVY"
        // rating * div class="_3LWZlK"
        // span class class="_2_R_DZ", 4th span
        
        let prodNameArr = $("._4rR01T");
        let pricesArr = $("._30jeq3._1_WHN1");
        let ratingArr = $("._3LWZlK");
        // let reviewArr = $(".a-size-base.puis-light-weight-text.s-link-centralized-style");
        let orgPriceArr = $("._3I9_wc._27UcVY");
        getDetails($,prodNameArr,pricesArr,ratingArr,orgPriceArr,productName);
        
    }
    
}

module.exports = scrapFlipkart;

