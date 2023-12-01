import mysql from 'mysql2'

const MAP = {
    'Username': 'username',
    'Activity': 'activity',
}

function addFilter(sql, filters) {
    let inserts = [];

    if (Object.keys(filters).length > 0) {
        let whereClauses = [];

        for (let field in filters) {
            whereClauses.push(`${MAP[field]} = ?`);
            inserts.push(filters[field]);
        }
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql = mysql.format(sql, inserts);
    return sql;
}

export default {addFilter}