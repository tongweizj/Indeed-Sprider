# ZhaoWork Sprider 项目说明

## 项目目录
```
.
├── README.md
├── app
│   ├── sprider             --- indeed 蜘蛛，采集职位
│   └── web                 --- 职位网站
├── docker-compose.yml      --- docker管理
├── services                --- docker关联文件夹
│   └── mysql 
└── source                  --- 资源类文件

```


爬虫项目，专注在以下功能
1. 抓取页面
2. 分析页面


## 操作守则

### 抓取招聘信息

```node
node sprider.js

```

## 参考项目

##### indeed-scraper
https://github.com/rynobax/indeed-scraper

##### 这个代码，把indeed-scraper 做成express 的api
https://github.com/fsanchezvilela/indeed-scrap-node/blob/master/app.js



scrapList.js
