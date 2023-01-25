const { SourceMap } = require("module");
const { type } = require("os");
const { mainModule } = require("process");
const puppeteer = require("puppeteer");

const scrapAmzn = require("./AmazonScrap/amazonmain");
const scrapCroma = require("./CromaScrap/cromamain");
const scrapFlipkart = require("./FlipkartScrap/flipkartmain");

const amazonLink = "https://www.amazon.in";
const cromaLink = "https://www.croma.com";
const flipkartLink = "https://www.flipkart.com";

const productName = "Canon Camera";
const checkName = productName.split(" ");

let page1, page2, page3;

let browserOpen = puppeteer.launch({
    headless: true,
    slowMo: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});


browserOpen
    .then(function (browserObj) {
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    }).then(function (newTab) {
        // open amazon on new page
        page1 = newTab;
        let openAmazon = newTab.goto(amazonLink);
        return openAmazon;
    }).then(function () {
        return page1.bringToFront();
    }).then(function () {
        let productEntered = page1.type("input[id='twotabsearchtextbox']", productName, { delay: 50 });
        return productEntered;
    }).then(function () {
        return waitAndClick("input[type='submit']", page1);
    }).then(function () {
        let waitFor0Seconds = page1.waitForTimeout(300);
        return waitFor0Seconds;
    }).then(function () {
        scrapAmzn(page1.url(), checkName);
    }).then(function () {
        scrapFlipkart(`https://www.flipkart.com/search?q=${productName}`);
    }).then(function () {
        return page1.close();
    }).then(function () {
        return page1.close();
    })

    

// browserOpen
//     .then(function (browserObj) {
//         let browserOpenPromise = browserObj.newPage();
//         return browserOpenPromise;
//     }).then(function (newTab) {
//         // open Croma on new page
//         page2 = newTab;
//         let openCroma = newTab.goto(cromaLink);
//         return openCroma;
//     }).then(function () {
//         let productEntered = page2.type("input[id='search']", productName, { delay: 50 });
//         return productEntered;
//     }).then(function () {
//         let EnterisPressed = page2.keyboard.press("Enter");
//         return EnterisPressed;
//     }).then(function () {
//         //console.log(page.url());
//         scrapCroma(page2.url());
//     })


// browserOpen
//     .then(function (browserObj) {
//         let browserOpenPromise = browserObj.newPage();
//         return browserOpenPromise;
//     }).then(function (newTab) {
//         // open Flipkart on new page
//         page3 = newTab;
//         let openFlipkart = newTab.goto(flipkartLink);
//         return openFlipkart;
//     }).then(function(){
//         let waitFor3Seconds = page3.waitForTimeout(3000);
//         return waitFor3Seconds;
//     }).then(function () {
//         let EscisPressed = page3.keyboard.press("Enter");
//         return EscisPressed;
//     }).then(function () {
//         let productEntered = page3.type("input[type='text']", productName, { delay: 50 });
//         return productEntered;
//     }).then(function () {
//             return waitAndClick("button[type='submit']", page3);
//     }).then(function () {
//         scrapFlipkart(page3.url());
//     }).then(function(){
//         return page3.close();
//     })

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitPromise = cPage.waitForSelector(selector);
        waitPromise.then(function () {
            let clickModal = cPage.click(selector, { delay: 50 });
            return clickModal;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}