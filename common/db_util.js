const { query } = require('../db/mysql/query'); //引入异步查询方法

// 自定义目标查询
async function custom_target_query(table_name, tar_sql, condition) {
    let sql = `select ${tar_sql} from ${table_name} where ${condition}`;
    let revenue_data = await query(sql);
    return revenue_data[0].target;
}

module.exports = {
    custom_target_query,
};
