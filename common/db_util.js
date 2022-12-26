const { query } = require('../db/mysql/query'); //引入异步查询方法
const schedule = require('node-schedule');
const { get_cur_date } = require('../common/util');
let dayjs = require('dayjs');
const { INSERT_DATA } = require('../db/mysql/sql');

// 自定义目标查询
async function custom_target_query(table_name, tar_sql, condition) {
    let sql = `select ${tar_sql} from ${table_name} where ${condition}`;
    let revenue_data = await query(sql);
    return revenue_data[0].target;
}

async function isExistTable(table_name) {
    let sql = `select count(*) as isExist from information_schema.tables where table_name='${table_name}'`;
    let data = await query(sql);
    return data[0].isExist === 1;
}

async function record_realtime_info(channel) {
    let begin_date = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    let end_date = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    let newuser = await custom_target_query(`registers_${channel}`, 'count(*) as target', `insert_time >= "${begin_date}" AND insert_time <= "${end_date}"`);

    // 获取活跃用户表名
    let date = get_cur_date().split(' ')[0];
    date = date.replaceAll('-', '_');
    table_name = `active_users_${date}`;

    let active_user = await custom_target_query(
        `${table_name}`,
        'count(*) as target',
        `insert_time >= "${begin_date}" AND insert_time <= "${end_date}" AND channel = ${channel}`
    );

    let btime1 = dayjs().subtract(2, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let etime1 = get_cur_date();
    let online_user = await custom_target_query(
        `${table_name}`,
        'count(*) as target',
        `update_time >= "${btime1}" AND update_time <= "${etime1}" AND channel = ${channel}`
    );

    let newuser_pay_money = 0;
    let user_id_sql = `select user_id from registers_${channel} where insert_time >= "${begin_date}" AND insert_time < "${end_date}"`; // 目标user_id 选择sql
    newuser_pay_money = await custom_target_query(
        'orders',
        'sum(pay_money) as target',
        `pay_time >= "${begin_date}" AND pay_time <= "${end_date}" AND channel = ${channel} AND user_id in (${user_id_sql})`
    );
    newuser_pay_money = (newuser_pay_money / 100).toFixed(2);

    let active_user_pay_money = await custom_target_query(
        'orders',
        'sum(pay_money) as target',
        `pay_time >= "${begin_date}" AND pay_time <= "${end_date}" AND channel = ${channel}`
    );
    active_user_pay_money = (active_user_pay_money / 100).toFixed(2);

    let insert_sql = INSERT_DATA(
        'realtime_data_records',
        `channel, record_time, newuser, active_user, online_user, newuser_pay_money, active_user_pay_money`,
        `${channel}, "${get_cur_date()}", ${newuser}, ${active_user}, ${online_user}, ${newuser_pay_money}, ${active_user_pay_money}`
    );
    let ret = await query(insert_sql);
    if (!ret.insertId) {
        return ERRCODE.insert_err;
    }
}

function update_data_record_per_minute() {
    const job = schedule.scheduleJob('0 * * * * *', () => {
        record_realtime_info(1);
        record_realtime_info(2);
    });
}

module.exports = {
    custom_target_query,
    isExistTable,
    update_data_record_per_minute,
};
