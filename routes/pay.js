const router = require('koa-router')();

const { query } = require('../db/mysql/query'); //引入异步查询方法
const { SHOW_ALL_TABLE, FIND_DATA, INSERT_DATA, UPDATE_DATA, CREATE_EVENTLOGS_TABLE } = require('../db/mysql/sql'); //部分引入sql库
const { get_cur_date } = require('../common/util');
const { ERRCODE } = require('../common/enum');
const fs = require('fs');
const table_cache_file_name = 'cache/exist_eventlogs_table_names.json';
let exist_eventlogs_table_names = JSON.parse(fs.readFileSync(table_cache_file_name));

router.prefix('/pay');

router.get('/', async (ctx, next) => {
    let query_res = await query(SHOW_ALL_TABLE); //异步方法调用
    ctx.body = query_res;
});

router.get('/sync_order', async (ctx, next) => {
    console.log(ctx.query);
    ctx.body = ERRCODE.ok;
});

module.exports = router;
