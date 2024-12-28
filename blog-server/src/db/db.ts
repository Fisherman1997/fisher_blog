import { ArticleList } from './entities/ArticleList'
import { Comment } from './entities/Comment'
import { RoutingConfigure } from './entities/RoutingConfigure'
import { RandomWrite } from './entities/RandomWrite'
import { User } from './entities/User'
import { Classification } from './entities/Classification'
import { DailyVisit } from './entities/DailyVisit'
import { Links } from './entities/Links'
import { Custom } from './entities/Custom'

/*
    使用typeORM链接/操作mysql数据库
    此路径的收集表的创建实体（表结构）
*/

export const EntitiesArray = [
    ArticleList,
    Comment,
    RoutingConfigure,
    RandomWrite,
    User,
    Classification,
    DailyVisit,
    Links,
    Custom
]