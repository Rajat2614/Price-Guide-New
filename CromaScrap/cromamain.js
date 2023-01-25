const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const getDetails = require("./cromafile");

function scrappingCroma(url){
    //console.log(url);
    request(url, cb);

    function cb(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            getTopicLinks(html);
            //console.log(html);
        }
    }

    function getTopicLinks(html) {
        let $ = cheerio.load(html);
        //console.log(html);

//        productname:"product-title plp-prod-title"
//        orgPriceArr: 'class-amount, id-old-price"
//        price: span->class-old-price, data_test_id = new-price
//        ratings and reviews: div tag -> class: cp-rating plp-ratings ratings-plp-line, 


        let prodNameArr = $("li > .product-item");
        console.log($(prodNameArr).text());
        // for(let i=0;i<prodNameArr.length;i++){
        //     console.log($(prodNameArr[i]).attr("href"));
        // }

        // let pricesArr = $("span[data_testid='new-price']");
        // let ratingArr = $(".cp-rating.plp-ratings.ratings-plp-line");
        // let reviewArr = $(".cp-rating.plp-ratings.ratings-plp-line");
        // let orgPriceArr = $("span[data_testid='old-price']");
        // //getDetails($,prodNameArr,pricesArr,ratingArr,reviewArr,orgPriceArr);
        // for(let i=0;i<prodNameArr.length;i++){
        //     console.log(`Porduct : ${prodNameArr[i]} Old Price : ${orgPriceArr} New Price : ${pricesArr} Rating : ${ratingArr}`);
        // }
    }
    
}

module.exports = scrappingCroma;


