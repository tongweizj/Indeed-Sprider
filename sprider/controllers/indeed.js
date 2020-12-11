'use strict';

const DateFormat = require('dateformat');
const Util = require('util');
const Crawler = require('crawler');

const DB = require('../utils/local-file');
const FundParser = require('../analyzer/fundparser');
const Log = require('../utils/log');
const { subtract } = require('lodash');
const FundIncrease = require('../controllers/fund-increase');
/// 模块说明
/// 1. 生成调度机制
/// 2. 生成抓取任务: 一个职位就是一个任务
/// 3. 根据 Crawl url
const config = require('../config');
const crawl = config.crawl;
const rankUri = crawl.rankUri;

const headers = [
  {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
  },
  {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  },
  {
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  },
  {
    'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0',
  },
  {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.3.4000 Chrome/30.0.1599.101 Safari/537.36',
  },
  {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 UBrowser/4.0.3214.0 Safari/537.36',
  },
];

class Task {
  constructor(type) {
    this.type = type;
    // 构造抓数据的url

    this.uri = Util.format(rankUri, type);
    // 从 header 里随机用一个,防止被禁
    this.headers = headers[Task.getRandomInt(headers.length)];

    // Init store path
    // 初始化 存储的路径
    var now = DateFormat(new Date(), 'yyyy/mm/dd');
    this.storePath = now + '/' + Task._fixType(type) + '.csv';
    this.recommendStorePath = now + '/' + Task._fixType(type) + '.recommend.json';

    this.tryTimes = 0;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static _fixType(type) {
    switch (type) {
      case 'gp':
        return 'gupiao';
      case 'zq':
        return 'zhaiquan';
      case 'zs':
        return 'zhishu';
      case 'hh':
        return 'hunhe';
      default:
        return type;
    }
  }
}

class TaskQueue {
  constructor() {
    this.tasks = [];
  }

  static from(fundTypes) {
    // 建一个空列表
    var taskQueue = new TaskQueue();
    // [] 分割出来
    fundTypes.forEach((fundType) => {
      taskQueue.addTask(new Task(fundType));
    });

    return taskQueue;
  }

  list() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  popTask() {
    return this.tasks.pop();
  }

  hasNext() {
    return this.tasks.length > 0;
  }
}

// Scheduler 调度器
// 安排整体工作的各个任务安排
// 每一次抓取,要做的工作
class Scheduler {
  constructor() {
    this.tryTimes = 0;
    this.allData = 0;
    var self = this;
    // self.taskQueue = TaskQueue.from([
    //     'gp',   // 股票型
    // ])
    self.taskQueue = TaskQueue.from([
      'gp', // 股票型
      'hh', // 混合型
      'zq', // 债券型
      'zs', // 指数型
      'qdii', // QDII
      'fof', // FOF
    ]);
    var allData = [];
    self.crawler = new Crawler({
      rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
      maxConnections: 1,
      callback: function (error, res, done) {
        if (error) {
          Log.error(error);
          self.schedule(res.options.task);
        } else {
          Log.success('Succeed to crawl ' + res.options.uri);

          allData.push({ data: res.body, task: res.options.task });
          FundIncrease.start(allData);

          // const recommendPath = res.options.task.recommendStorePath;
          // const recommendFunds = Analyzer.analyze(funds);
          // DB.write(recommendPath, recommendFunds)
        }

        done();
      },
    });
  }

  // 入口
  // 整理出任务清单,并把任务传递给调度
  start() {
    // 整理任务清单
    this.taskQueue.list().forEach((task) => {
      this.schedule(task);
    });
  }
  /// 开始单次任务的调度
  schedule(task) {
    if (!task.success && task.tryTimes < 3) {
      task.tryTimes++;
      Log.info('Schedule REQ task ' + task.uri + ', try times = ' + task.tryTimes);
      this.crawler.queue({ uri: task.uri, headers: task.headers, task: task });
    }
  }
}
// 开始
exports.start = function start() {
  new Scheduler().start();
};
