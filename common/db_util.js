const { query } = require('../db/mysql/query'); //引入异步查询方法

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

module.exports = {
    custom_target_query,
    isExistTable,
};
