const router = require('koa-router')();

const { query } = require('../db/mysql/query'); //引入异步查询方法
const { SHOW_ALL_TABLE, FIND_DATA, INSERT_DATA, UPDATE_DATA, CREATE_EVENTLOGS_TABLE, CREATE_ACTIVE_USER_TABLE } = require('../db/mysql/sql'); //部分引入sql库
const { get_cur_date } = require('../common/util');
const { isExistTable } = require('../common/db_util');
const { ERRCODE } = require('../common/enum');
const fs = require('fs');

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

exist_table_names.active_user_table = exist_table_names.active_user_table || [];

// 获取活跃用户表
let get_active_user_table = async function () {
    let date = get_cur_date().split(' ')[0];
    date = date.replaceAll('-', '_');
    table_name = `active_users_${date}`;
    if (!exist_table_names.active_user_table.includes(table_name)) {
        exist_table_names.active_user_table.push(table_name);
        await query(CREATE_ACTIVE_USER_TABLE(table_name));
        save_table_cache_info();
    }
    return table_name;
};

// 更新活跃用户表
let update_active_user_table = async function (channel, user_id, update_type) {
    let table_name = await get_active_user_table();
    let find_sql = FIND_DATA(table_name, `user_id="${user_id}"`);
    let data = await query(find_sql);
    if (data.length > 0) {
        let updateSql = UPDATE_DATA(table_name, `update_time="${get_cur_date()}",update_type=${update_type}`, `user_id="${user_id}" AND channel=${channel}`);
        let upret = await query(updateSql);
        if (!upret.changedRows > 0) {
            return ERRCODE.update_active_user_err;
        }
    } else {
        let insert_sql = INSERT_DATA(
            table_name,
            `user_id, channel, update_type, update_time, insert_time, insert_timestamp`,
            `"${user_id}", ${channel}, ${update_type}, "${get_cur_date()}", "${get_cur_date()}", ${Math.floor(Date.now() / 1000)}`
        );
        let ret = await query(insert_sql);
        if (!ret.insertId) {
            return ERRCODE.insert_err;
        }
    }
    return ERRCODE.ok;
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

    let table_name = 'logins_' + quest.channel;
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

    let updateSql = UPDATE_DATA(
        'registers_' + quest.channel,
        `total_live_time=${quest.total_live_time}, update_time="${get_cur_date()}"`,
        `user_id="${quest.user_id}"`
    );
    let upret = await query(updateSql);
    if (!upret.changedRows > 0) {
        ctx.body = ERRCODE.update_livetime_err;
        return;
    }
    let update_active_user_ret = await update_active_user_table(quest.channel, quest.user_id, UPDATE_TYPE.login);
    ctx.body = update_active_user_ret;
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

    let table_name = 'registers_' + quest.channel;
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

    let update_active_user_ret = await update_active_user_table(quest.channel, quest.user_id, UPDATE_TYPE.register);
    ctx.body = update_active_user_ret;
});

router.get('/eventlog', async (ctx, next) => {
    let quest = ctx.query;
    // console.log(quest);
    if (!quest.channel || !quest.event_main_type || !quest.event_sub_type) {
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

    if (quest.total_live_time) {
        let updateSql = UPDATE_DATA(
            'registers_' + quest.channel,
            `total_live_time=${quest.total_live_time}, update_time="${get_cur_date()}"`,
            `user_id="${quest.user_id}"`
        );
        let upret = await query(updateSql);
        if (!upret.changedRows > 0) {
            ctx.body = ERRCODE.update_livetime_err;
            return;
        }
    }

    if (+quest.event_main_type === 13 || +quest.event_main_type === 14 || +quest.event_main_type === 1300) {
        ctx.body = ERRCODE.ok;
    } else {
        let update_active_user_ret = await update_active_user_table(quest.channel, quest.user_id, UPDATE_TYPE.eventlog);
        ctx.body = update_active_user_ret;
    }
});

module.exports = router;
