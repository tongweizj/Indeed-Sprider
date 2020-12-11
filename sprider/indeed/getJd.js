const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

exports.world = function () {
  console.log('Hello World');
};

let getHtml = async function (url, cb) {
  console.log('2-2');
  // const html =  axios.get(url)
  await axios
    .get(url)
    .then(function (response) {
      console.log('2-2-2');
      cb(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
let getJdPage = function (url, cb) {
  let jdData = {};
  console.log('2-1');
  // const html = await axios.get(url)
  getHtml(url, function (html) {
    console.log('2-3');
    // console.log(html)
    let $ = cheerio.load(html.data);
    // 获取JD信息
    // 获取职位
    let jdInfo = {};
    let jdTitle = $('.jobsearch-JobInfoHeader-title-container>h3').text();
    jdInfo.jdTitle = jdTitle;
    // 获取JD描述
    let jdDes = $('#jobDescriptionText').html(); //text()
    jdInfo.jdDes = jdDes;

    // 获取公司信息
    let comInfo = {};
    // 获取公司名
    let cname = $('.jobsearch-InlineCompanyRating>.icl-u-xs-mr--xs>a').text();
    comInfo.name = cname;
    // 获取公司地址
    let cAddress = $('.jobsearch-JobComponent-description>.icl-u-xs-mb--md').text();
    cAddress = cAddress.split('F')[0];
    comInfo.address = cAddress;

    jdData.src = url;
    jdData.jdInfo = jdInfo;
    jdData.comInfo = comInfo;
    console.log('处理完成：' + url);
  });

  cb(jdData);
  // return jdData
};

module.exports = class Indeed {
  static getJdsAll(jdList, cb) {
    console.log('Hello World');
    let jdArr = [];
    let num = 1;
    jdList.forEach((url) => {
      getJdPage(url, function (jddata) {
        console.log('2-4');
        jddata.id = num;
        console.log(jddata);
        jdArr.push(jddata);
        // console.log(jdArr)
        num++;
      });
    });
    cb(jdArr);
  }
};
