const router = require('koa-router')();

const { query } = require('../db/mysql/query'); //引入异步查询方法
const { SHOW_ALL_TABLE, FIND_DATA, INSERT_DATA, UPDATE_DATA, CREATE_EVENTLOGS_TABLE } = require('../db/mysql/sql'); //部分引入sql库
const { get_cur_date } = require('../common/util');
const { custom_target_query } = require('../common/db_util');
const { ERRCODE } = require('../common/enum');
const fs = require('fs');
const table_cache_file_name = 'cache/exist_eventlogs_table_names.json';
let exist_eventlogs_table_names = JSON.parse(fs.readFileSync(table_cache_file_name));

router.prefix('/pay');

router.get('/', async(ctx, next) => {
    let query_res = await query(SHOW_ALL_TABLE); //异步方法调用
    ctx.body = query_res;
});

router.get('/sync_order', async(ctx, next) => {
    let quest = ctx.query;
    // console.log(quest);
    if (!quest.channel ||
        !quest.user_id ||
        !quest.order_no ||
        !quest.order_name ||
        !quest.pay_money ||
        !quest.order_pay_status ||
        !quest.order_use_status ||
        !quest.create_time ||
        !quest.pay_time ||
        !quest.os
    ) {
        ctx.body = ERRCODE.param_err;
        return;
    }

    let is_exists = await custom_target_query('orders', 'count(*) as target', `order_no="${quest.order_no}"`);
    if (is_exists !== 0) {
        ctx.body = ERRCODE.date_exists;
        return;
    }

    let table_name = 'orders';
    let insert_sql = INSERT_DATA(
        table_name,
        `channel, user_id, os, order_no, order_name, pay_money, order_pay_status, order_use_status, create_time, pay_time`,
        `${quest.channel}, "${quest.user_id}", ${quest.os},"${quest.order_no}" ,"${quest.order_name}" ,${quest.pay_money} ,${quest.order_pay_status} ,${quest.order_use_status} ,"${quest.create_time}","${quest.pay_time}"`
    );
    let ret = await query(insert_sql);

    if (!ret.insertId) {
        ctx.body = ERRCODE.insert_err;
        return;
    }
    ctx.body = ERRCODE.ok;
});

module.exports = router;