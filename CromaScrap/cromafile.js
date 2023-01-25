const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getDetailscroma($,prodNameArr,pricesArr,ratingArr,reviewArr,orgPriceArr) {
    //getIssueLink(prodName,price,rating,reviews,orginalPrice);

    for (let i = 0; i < prodNameArr.length; i++) {
        let prodName = $(prodNameArr[i]).text();
        let price = $(pricesArr[i]).text();
        let rating = $(ratingArr[i]).text();
        let review = $(reviewArr[i]).text();
        let orgPrice = $(orgPriceArr[i]).text();
        if(prodName.search("") != -1 ){

            if(orginalPrice == ""){
                orginalPrice = price;
            }
            else{
                orgPrice = orgPrice.slice(1);
            }
            saveData(prodName,price,rating,review,orgPrice);
            //console.log(`Product : ${prodName}  Price : ${price}  Rating : ${rating} Reviews : ${reviews} Original Price : ${orginalPrice}`);
        }       
    }
    

    function saveData(prodName,price,rating,review,orgPrice) {
        let arr = [];
        arr.push(`Product : ${prodName} Price : ${orgPrice} Discounted Price : ${price} Rating : ${rating} Reviews : ${review}`);
        
        let folderpath = path.join(__dirname,"Croma");
        dirCreator(folderpath);
        let filepath = path.join(folderpath,prodName+".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end();

    }

}

module.exports = getDetailscroma

function dirCreator(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}