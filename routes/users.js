const router = require('koa-router')();

const { query } = require('../db/mysql/query'); //引入异步查询方法
const {
    SHOW_ALL_TABLE,
    FIND_DATA,
    INSERT_DATA,
    UPDATE_DATA,
    CREATE_EVENTLOGS_TABLE,
    CREATE_REGISTER_USER_TABLE,
    CREATE_LOGIN_USER_TABLE,
} = require('../db/mysql/sql'); //部分引入sql库
const { get_cur_date } = require('../common/util');
const { isExistTable } = require('../common/db_util');
const { ERRCODE } = require('../common/enum');
const fs = require('fs');
const dayjs = require('dayjs');

const UPDATE_TYPE = {
    register: 1,
    login: 2,
    eventlog: 3,
};

// 辅助函数
const save_table_cache_info = function () {
    fs.writeFileSync(exist_table_cache_file_name, JSON.stringify(exist_table_names));
};

const table_cache_file_name = 'cache/exist_eventlogs_table_names.json';
let exist_eventlogs_table_names = JSON.parse(fs.readFileSync(table_cache_file_name));

const exist_table_cache_file_name = 'cache/exist_table_names_1.json';
if (!fs.existsSync(exist_table_cache_file_name)) {
    fs.writeFileSync(exist_table_cache_file_name, JSON.stringify({}));
}
var exist_table_names = JSON.parse(fs.readFileSync(exist_table_cache_file_name));
if (!exist_table_names.eventlogs_table && exist_eventlogs_table_names.length > 0) {
    exist_table_names.eventlogs_table = exist_eventlogs_table_names;
    save_table_cache_info();
} else if (!exist_table_names.eventlogs_table) {
    exist_table_names.eventlogs_table = [];
    save_table_cache_info();
}

exist_table_names.register_table = exist_table_names.register_table || {};
exist_table_names.login_table = exist_table_names.login_table || {};

// 获取注册用户表
let get_register_user_table = async function (channel) {
    let month = dayjs().month();
    table_name = `register_${channel}_month_${month}`;
    if (!exist_table_names.register_table[table_name]) {
        exist_table_names.register_table[table_name] = true;
        await query(CREATE_REGISTER_USER_TABLE(table_name));
        save_table_cache_info();
    }
    return table_name;
};

// 获取登录用户表
let get_login_user_table = async function (channel) {
    let month = dayjs().month();
    table_name = `login_${channel}_month_${month}`;
    if (!exist_table_names.login_table[table_name]) {
        exist_table_names.login_table[table_name] = true;
        await query(CREATE_LOGIN_USER_TABLE(table_name));
        save_table_cache_info();
    }
    return table_name;
};

router.prefix('/users');

router.get('/', async (ctx, next) => {
    let query_res = await query(SHOW_ALL_TABLE); //异步方法调用
    ctx.body = query_res;
});

router.get('/login', async (ctx, next) => {
    let quest = ctx.query;
    // console.log(quest);
    if (
        !quest.channel ||
        !quest.user_id ||
        !quest.cur_diamond ||
        !quest.cur_task_id ||
        !quest.total_buy_cnt ||
        !quest.total_pay_money ||
        !quest.total_video_cnt ||
        !quest.total_live_day ||
        !quest.total_live_time
    ) {
        ctx.body = ERRCODE.param_err;
        return;
    }

    quest.os = quest.os || 'null';

    let table_name = await get_login_user_table(quest.channel);
    let insert_sql = INSERT_DATA(
        table_name,
        `user_id, os, cur_diamond, cur_task_id, total_buy_cnt, total_pay_money, total_video_cnt, total_live_day, insert_time, insert_timestamp`,
        `"${quest.user_id}", "${quest.os}",${quest.cur_diamond} ,${quest.cur_task_id} ,${quest.total_buy_cnt} ,${quest.total_pay_money} ,${
            quest.total_video_cnt
        } ,${quest.total_live_day},"${get_cur_date()}", ${Math.floor(Date.now() / 1000)}`
    );
    let ret = await query(insert_sql);
    if (!ret.insertId) {
        ctx.body = ERRCODE.insert_err;
        return;
    }

    ctx.body = ERRCODE.ok;
});

router.get('/register', async (ctx, next) => {
    let quest = ctx.query;
    // console.log(quest);
    if (!quest.channel || !quest.user_id) {
        ctx.body = ERRCODE.param_err;
        return;
    }

    quest.os = quest.os || 'null';
    quest.adChannel = quest.adChannel || 'null';

    let table_name = await get_register_user_table(quest.channel);
    let find_sql = FIND_DATA(table_name, `user_id="${quest.user_id}"`);
    let data = await query(find_sql);
    if (data.length > 0) {
        ctx.body = ERRCODE.date_exists;
        return;
    }

    let insert_sql = INSERT_DATA(
        table_name,
        `user_id, os, ad_channel, insert_time, insert_timestamp`,
        `"${quest.user_id}", "${quest.os}", "${quest.adChannel}", "${get_cur_date()}", ${Math.floor(Date.now() / 1000)}`
    );
    let ret = await query(insert_sql);
    if (!ret.insertId) {
        ctx.body = ERRCODE.insert_err;
        return;
    }

    ctx.body = ERRCODE.ok;
});

router.get('/eventlog', async (ctx, next) => {
    let quest = ctx.query;
    // console.log(quest);
    if (!quest.channel || !quest.event_main_type || !quest.event_sub_type || quest.channel === 'undefined') {
        ctx.body = ERRCODE.param_err;
        return;
    }

    quest.user_id = quest.user_id || 0;
    quest.param1 = quest.param1 || 0;
    quest.param2 = quest.param2 || 0;
    quest.param3 = quest.param3 || 0;
    quest.param4 = quest.param4 || 0;
    quest.custom_param = quest.custom_param || 'null';
    quest.os = quest.os || 'null';

    let channels = [1, 2, 3, 4, 5, 6, 1000];
    let maxmaintype = 100000000000;
    let table_name;
    if (channels.includes(+quest.channel) && +quest.event_main_type <= maxmaintype) {
        let date = get_cur_date().split(' ')[0];
        date = date.replaceAll('-', '_');
        table_name = `channel${quest.channel}_maintype${quest.event_main_type}_${date}_eventlogs`;
        if (!exist_table_names.eventlogs_table.includes(table_name)) {
            exist_table_names.eventlogs_table.push(table_name);
            let ret = await query(CREATE_EVENTLOGS_TABLE(table_name));
            save_table_cache_info();
        }
    } else {
        table_name = 'eventlogs_' + quest.channel;
    }

    let insert_sql = INSERT_DATA(
        table_name,
        `user_id, event_main_type, event_sub_type, param1, param2, param3, param4, custom_param, os, insert_time, insert_timestamp`,
        `"${quest.user_id}",${quest.event_main_type} ,${quest.event_sub_type} ,"${quest.param1}" ,"${quest.param2}" , "${quest.param3}" , "${quest.param4}","${
            quest.custom_param
        }", "${quest.os}", "${get_cur_date()}", ${Math.floor(Date.now() / 1000)}`
    );

    // console.log('sql: ' + insert_sql, get_cur_date().split(' '));
    let ret = await query(insert_sql);
    if (!ret.insertId) {
        ctx.body = ERRCODE.insert_err;
        return;
    }

    ctx.body = ERRCODE.ok;
});

module.exports = router;
