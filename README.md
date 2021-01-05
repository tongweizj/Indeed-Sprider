# Project: Indeed Sprider

## 项目目录

``` node

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

## 项目说明

Indeed Sprider，是我的练习项目。
主要目的是，通过学习这个项目，完整的学习express。

## 功能清单

### 网站抓取

- 根据「职位」，抓取indeed网站上的职位信息
- 抓取资讯网站
  - 36kr

### 前端网站

- 首页
  - 显示职位、课程、资讯  
- 职位
  - 职位清单,没有详情页，全部跳转回原网站
  - 公司详情
- 课程
  - 课程清单,没有详情页，全部跳转回原网站
- 资讯
  - 资讯列表，没有详情页，全部跳转回原网站

## 使用手册

### web

```barsh
# 启动网站
cd job_web
pm2 start start.js

```

### sprider

```barsh
# 更新抓取
cd job_Sprider
node app.js

```

### strapi
API 调用账号
zhaowork C2DcMUwN8JD3D6q

http://174.138.38.105:2703/

```barsh
pm2 start server.js
```

## 参考项目

### indeed-scraper

<https://github.com/rynobax/indeed-scraper>

### 这个代码，把indeed-scraper 做成express 的api

<https://github.com/fsanchezvilela/indeed-scrap-node/blob/master/app.js>
