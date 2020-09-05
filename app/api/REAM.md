# ZhaoWork API项目说明

## 项目目录


## 项目说明
API模块负责：
1. 负责爬虫和数据库之间的数据交换
2. 负责web和数据库之间的数据交换



## API接口说明

### titleList 职位列表
http://192.168.0.101:3010/mock/7/titles

要抓取的职位列表

- 类型: get 
- 获取 list

```
titleList = ['machine learning engineer', 'full stack developer', 'data scientist', 'back end developer'] 
```

### GET_CompanyItem 获取公司信息

- 类型: post 
- 提交参数

```
uuid:
```
- 获取: list

### POST_CompanyItem 提交公司信息
### addJDItem 添加JD
- 类型: post 
- 提交参数
```
uuid:
name: item.company,
location:item.location
```
- 