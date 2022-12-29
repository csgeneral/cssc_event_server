let dayjs = require('dayjs');

// 获取当前时间字符串
function get_cur_date() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

function get_register_user_table(channel) {
    let table_name = '';
    if (dayjs() > dayjs('2022-12-29 10:53:00')) {
        let month = dayjs().month();
        table_name = `register_${channel}_month_${month}`;
    } else {
        table_name = `registers_${channel}`;
    }

    return table_name;
}

function get_login_user_table(channel) {
    let table_name = '';
    if (dayjs() > dayjs('2022-12-29 10:53:00')) {
        let month = dayjs().month();
        table_name = `login_${channel}_month_${month}`;
    } else {
        table_name = `logins_${channel}`;
    }

    return table_name;
}

module.exports = {
    get_cur_date,
    get_register_user_table,
    get_login_user_table,
};
