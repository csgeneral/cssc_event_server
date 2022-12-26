let dayjs = require('dayjs');

// 获取当前时间字符串
function get_cur_date() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    get_cur_date,
};
