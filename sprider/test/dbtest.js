const hash = require('object-hash');
const mongoose = require('mongoose');

const jdDbModel = require('../model/jd');
const companyDbModel = require('../model/company');

const url = 'mongodb://admin:123456@mongo:27017/db_jds'
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');

})

const onejd = 
{
    "title" : "Back-End Developer",
    "summary" : "1111111111Enhance and improve our existing Java back-end system.\n Participate in requirements analysis, system design, and implementation of the back-end systems in our…",
    "url" : "https://ca.indeed.com/rc/clk?jk=39dcfdbcadda35cc&fccid=c2dddba55fb89220&vjs=3",
    "company" : "Wysdom.AI",
    "location" : "Richmond Hill, ON",
    "postDate" : "03/28/2020",
    "salary" : "",
    "isEasyApply" : true,
    "jobTitle" : "back end developer"
}

// let item_hash = hash(onejd.company + onejd.title + onejd.summary)

// jdDbModel.find({
//     hash: item_hash
//   }, function(err,docs){
//     if(err){
//         console.log(err);
//         return; 
//     }
//     if (docs.length === 0){
//         return false
//     } 
//     return true

// })



console.log(onejd.company);
let item_hash = hash(onejd.company)
companyDbModel.find({
    name: onejd.company
  }, function (err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(docs)
    if (docs.length === 0) {
        console.log('no company,now insert')
        let oneCompany = new companyDbModel({
            _id: new mongoose.Types.ObjectId(),
            name: onejd.company,
            hash:item_hash
        })
        oneCompany.save(function(err){
            if (err) throw err
            console.log('Company successfully saved.');
            console.log(oneCompany._id);
        })

        


    //   return false
     
    }
    // return true
    console.log(docs._id)
  })