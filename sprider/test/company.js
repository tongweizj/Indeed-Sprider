const hash = require('object-hash');
const mongoose = require('mongoose');
const dbHelper = require('../utils/dbhelper')
const jdDbModel = require('../model/jd');
const companyDbModel = require('../model/company');

const url = 'mongodb://admin:123456@mongo:27017/db_jds'
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');

    const onejd ={
        title: 'Machine Learning Engineer',
        summary: 'Our platform helps online retailers bridge the gap between online and offline conversion rates.\n' +
          ' No fancy jargon, just 100% accuracy every time.',
        url: 'https://ca.indeed.com/company/Adeptmind-Inc./jobs/Machine-Learning-Engineer-dfe2a02499ef2448?fccid=31196f4f50c270cb&vjs=3',
        company: 'Adeptmind',
        location: 'Toronto, ON',
        postDate: '03/25/2020',
        salary: '$25 - $63 an hour',
        isEasyApply: true,
        jobTitle: 'data scientist',
        hash: '1d1540532d03b5dc83807ae464dbcfdcb076e950'
      }


    // const onejd = {
    //     "title": "Back-End Developer",
    //     "summary": "1111111111Enhance and improve our existing Java back-end system.\n Participate in requirements analysis, system design, and implementation of the back-end systems in our…",
    //     "url": "https://ca.indeed.com/rc/clk?jk=39dcfdbcadda35cc&fccid=c2dddba55fb89220&vjs=3",
    //     "company": "Wysdom.AIddddddd",
    //     "location": "Richmond Hill, ON",
    //     "postDate": "03/28/2020",
    //     "salary": "",
    //     "isEasyApply": true,
    //     "jobTitle": "back end developer"
    // }
    // console.log(onejd.company)
    // let companyID = dbHelper.insertCompany(onejd)
    // console.log(companyID)


    const filter = {
        hash: hash(onejd.company)
    };
    const update = {
        name: onejd.company,
        location: onejd.location
    };
    companyDbModel.findOneAndUpdate(filter, update, {upsert: true,new: true}, function(err, doc) {
        if (err) return console.log('find err');
        console.log(doc);
    });



    // console.log(doc.name);
    // onejd.company = doc._id
    // // logger.info(item);
    // console.log(onejd);

})