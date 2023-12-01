import mysql from 'mysql2'

// applies filter to the sql statement (WHERE or SET clause)
// revised version that takes a MAP
export function addWhereClause(sql, filters, MAP) {
    if (Object.keys(filters).length > 0) {
        let inserts = [];
        let whereClauses = [];
        for (let field in filters) {
            whereClauses.push(`${MAP[field]} = ?`);
            inserts.push(filters[field]);
        }
        sql +=  ' WHERE ' + whereClauses.join(' AND ');
        sql = mysql.format(sql, inserts);
    }
    return sql;
}

// applies filter to the sql statement (SET clause)
// revised version that takes a MAP
export function addSetClause(sql, filters, MAP) {
    if (Object.keys(filters).length > 0) {
        let inserts = [];
        let whereClauses = [];
        for (let field in filters) {
            whereClauses.push(`${MAP[field]} = ?`);
            inserts.push(filters[field]);
        }
        sql +=  ' SET ' + whereClauses.join(', ');
        sql = mysql.format(sql, inserts);
    }
    return sql;
}
