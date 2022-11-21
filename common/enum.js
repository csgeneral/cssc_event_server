var ERRCODE = {
    ok: { code: 0, msg: '操作成功' },
    date_exists: { code: 2, msg: '数据已经存在' },
    param_err: { code: 1, msg: '参数错误' },
    insert_err: { code: 3, msg: '插入数据不成功' },
    update_livetime_err: { code: 4, msg: '更新累计在线时间失败' },
    password_err: { code: 5, msg: '密码输入错误' },
};

module.exports = {
    ERRCODE,
};
