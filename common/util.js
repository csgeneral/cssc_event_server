// 获取当前时间字符串
function get_cur_date() {
    return new Date(+new Date() + 8 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    get_cur_date,
};
