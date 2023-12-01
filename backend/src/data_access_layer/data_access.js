import  mysql from 'mysql2';


export function updateTable(tableName, conditions, newValues) {
    let setClause = Object.keys(newValues).map((key) => `${key} = ?`).join(', ');
    let whereClause = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
    let query = `UPDATE ?? SET ${setClause} WHERE ${whereClause}`;
    let values = [...Object.values(newValues), ...Object.values(conditions)];
    let inserts = [tableName, ...values];
    let sql = mysql.format(query, inserts);
    return sql;
}

export function addFilter(sql, filters) {
    let inserts = [];

    if (Object.keys(filters).length > 0) {
        let whereClauses = [];

        for (let field in filters) {
            whereClauses.push(`${field} = ?`);
            inserts.push(filters[field]);
        }
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql = mysql.format(sql, inserts);
    return sql;
}

