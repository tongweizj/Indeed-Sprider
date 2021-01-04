const DB = require('../services/mongo')
// const items = [
//   {
//     title: '11111111',
//     summary:
//       'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
//     url: 'https://www.indeed.com/1',
//     company: 'Paymentus',
//     location: 'Richmond Hill, ON',
//     postDate: '12/30/2020',
//     salary: '',
//     isEasyApply: true
//   },

//   {
//     title: '2222222',
//     summary:
//       'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
//     url: 'https://www.indeed.com/2',
//     company: 'Paymentus',
//     location: 'Richmond Hill, ON',
//     postDate: '12/30/2020',
//     salary: '',
//     isEasyApply: true
//   },
//   {
//     title: '333333',
//     summary:
//       'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
//     url: 'https://www.indeed.com/3',
//     company: 'Paymentus3333333',
//     location: 'Richmond Hill, ON',
//     postDate: '12/30/2020',
//     salary: '',
//     isEasyApply: true
//   }
// ]
// DB.saveJDs(items)

const jds = [
  {
    jdD: '11111111',
    summary:
      'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
    url: 'https://www.indeed.com/1'
  },

  {
    jdD: '2222222',
    summary:
      'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
    url: 'https://www.indeed.com/2',
    company: 'Paymentus',
    location: 'Richmond Hill, ON',
    postDate: '12/30/2020',
    salary: '',
    isEasyApply: true
  },
  {
    jdD: '333333',
    summary:
      'To achieve optimal performance and client satisfaction, Paymentus is supported by a team of highly committed, striving, and creative employees who excel in…',
    url: 'https://www.indeed.com/3',
    company: 'Paymentus3333333',
    location: 'Richmond Hill, ON',
    postDate: '12/30/2020',
    salary: '',
    isEasyApply: true
  }
]
DB.updateJdDes(jds)

// let temp = [
//   {
//     title: 'PhD University Grad Machine Learning Engineer',
//     summary:
//       'Hands-on experience with big data technologies (e.g., Hadoop/Spark) and scalable realtime systems that process stream data.',
//     url:
//       'https://www.indeed.com/rc/clk?jk=5ee9a286c74dc552&fccid=43014b1412e0a7b6&vjs=3',
//     company: 'Pinterest',
//     location: 'Toronto, ON',
//     postDate: '01/03/2021',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Senior data analyst - marketing',
//     summary:
//       'Work directly with engineering to structure our data and ensure data integrity & quality.\n' +
//       ' Capable of condensing data and telling a persuasive story to business…',
//     url:
//       'https://www.indeed.com/rc/clk?jk=ce8247f272062e9c&fccid=ca93cbd13ef8b478&vjs=3',
//     company: 'Coffee Meets Bagel',
//     location: 'Toronto, ON',
//     postDate: '01/02/2021',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Learn more about our Digital Analytics team!',
//     summary:
//       'Data Engineer: You will be Integral to maintaining operational stability, and formulating techniques for quality data collection to ensure adequacy, accuracy,…',
//     url:
//       'https://www.indeed.com/rc/clk?jk=ea4689c38fc4fd63&fccid=3002307a9e5b4706&vjs=3',
//     company: 'Scotiabank',
//     location: 'Toronto, ON',
//     postDate: '01/01/2021',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Director of Analytics and Reporting',
//     summary:
//       'Development and implementation for data integration solutions using SQL, SAS and other data management software.',
//     url:
//       'https://www.indeed.com/rc/clk?jk=581a8c7bd4869379&fccid=dd616958bd9ddc12&vjs=3',
//     company: 'HOLLAND GROUP FINANCIAL',
//     location: 'Toronto, ON',
//     postDate: '01/01/2021',
//     salary: '$100,000 - $110,000 a year',
//     isEasyApply: false
//   },
//   {
//     title: 'Data Engineer - Advertising Analytics Data Pipeline',
//     summary:
//       'Knowledge of data management fundamentals and data storage principles.\n' +
//       ' Experience with data modeling, data warehousing, and building ETL pipelines.',
//     url:
//       'https://www.indeed.com/rc/clk?jk=34879221dd7f446a&fccid=fe2d21eef233e94a&vjs=3',
//     company: 'AMZN CAN Fulfillment Svcs, ULC',
//     location: 'Toronto, ON',
//     postDate: '12/31/2020',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Senior Analyst, Data Science',
//     summary:
//       'Extensive experience in data validation, data analysis & writing SQL queries.\n' +
//       ' Utilize SQL and Power BI to perform ad-hoc requests for reporting and data…',
//     url:
//       'https://www.indeed.com/rc/clk?jk=998a0021ba94b7fb&fccid=02ea45365a173976&vjs=3',
//     company: 'ContactPoint 360',
//     location: 'Mississauga, ON',
//     postDate: '12/31/2020',
//     salary: '',
//     isEasyApply: true
//   },
//   {
//     title: 'Sr. Associate Data Science and Analytics',
//     summary:
//       'Leverage data to identify optimization opportunities and build the experiment pipeline.\n' +
//       ' Passion for digital analytics, working with data and deriving insights…',
//     url:
//       'https://www.indeed.com/rc/clk?jk=9154f34148e9eed7&fccid=1b0043cf80779505&vjs=3',
//     company: 'Publicis Sapient',
//     location: 'Toronto, ON',
//     postDate: '12/30/2020',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Senior Panel & Shopper data Analyst- Toronto',
//     summary:
//       'Have 5 years of shopper data analysis experience in the Consumer Packaged Goods industry.\n' +
//       ' Manage the analysis wing of new tools Plastk will develop to create…',
//     url:
//       'https://www.indeed.com/company/Plastk/jobs/Senior-Panel-Shopper-Data-Analyst-9151b96211627ebf?fccid=4e817fdb361b0c20&vjs=3',
//     company: 'Plastk Financial',
//     location: 'Toronto, ON',
//     postDate: '12/30/2020',
//     salary: '',
//     isEasyApply: true
//   },
//   {
//     title: 'Junior Data Science Specialist - MAP',
//     summary:
//       'Prior experience in cleaning raw data, exploratory data analyses - required.\n' +
//       ' Demonstrate deep understanding of various sources of biases in data.',
//     url:
//       'https://www.indeed.com/rc/clk?jk=1460a9585053957f&fccid=8e32d72489a91f47&vjs=3',
//     company: "St. Michael's Hospital",
//     location: 'Toronto, ON',
//     postDate: '12/29/2020',
//     salary: '',
//     isEasyApply: false
//   },
//   {
//     title: 'Data Analyst - Machine Learning',
//     summary:
//       'Understanding and experience with challenges of longitudinal data analysis including correlated data, irregularly timed data, missing data, etc.',
//     url:
//       'https://www.indeed.com/company/Modern-Scientist-Global/jobs/Data-Analyst-b83351356a16c0d7?fccid=b40fb9f51752c5ad&vjs=3',
//     company: 'Modern Scientist Global',
//     location: 'Toronto, ON',
//     postDate: '12/29/2020',
//     salary: '',
//     isEasyApply: true
//   }
// ]
