let dayjs = require('dayjs');
const { caches } = require('./cache');

// 获取当前时间字符串
function get_cur_date() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

function get_register_user_table(channel) {
    let table_name = '';
    let month = dayjs().month();
    table_name = `register_${channel}_month_${month}`;

    return table_name;
}

function get_login_user_table(channel) {
    let table_name = '';
    let month = dayjs().month();
    table_name = `login_${channel}_month_${month}`;

    return table_name;
}

function update_online_users(channel, user_id) {
    let time = dayjs().startOf('minute').format('YYYY-MM-DD HH:mm:ss');
    caches.online_users[channel] = caches.online_users[channel] || {};
    caches.online_users[channel][time] = caches.online_users[channel][time] || {};
    let temp = caches.online_users[channel][time];
    if (!temp[user_id]) {
        temp[user_id] = 1;
    } else {
        temp[user_id]++;
    }
}

function get_online_user_cnt(channel) {
    let cnt = 0;
    if (caches.online_users && caches.online_users[channel]) {
        let online_users = caches.online_users[channel];
        for (let m = 0; m < 3; m++) {
            let time = dayjs().startOf('minute').subtract(m, 'minute').format('YYYY-MM-DD HH:mm:ss');
            if (online_users[time]) {
                cnt += Object.keys(online_users[time]).length;
            }
        }
    }

    return cnt;
}

function clear_online_user_cache() {
    caches.online_users = {};
}

module.exports = {
    get_cur_date,
    get_register_user_table,
    get_login_user_table,
    update_online_users,
    get_online_user_cnt,
    clear_online_user_cache,
};
