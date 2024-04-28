import express from 'express'
const router = express.Router();
import { connection } from '../data_access_layer/dbconfig.js'
import audit from './audit.js'
import mysql from 'mysql2'

router.post('/audition', async (req, res, next) => {
    let s = `SELECT username AS Username, activity AS Activity, target AS Target, detail AS "Detail", activity_time
        AS Time FROM Audition`
    let sql = audit.addFilter(s, req.body);
    sql += ' ORDER BY Time DESC'
    try {
        let [result] = await connection.execute(sql)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.post('/add_user', async (req, res, next) => {
    let parameters = req.body;
    let sql = "INSERT INTO Users(username, password, role, name, email) VALUES (?, ?, ?, ?, ?)";
    try {
        await connection.execute(sql, [parameters.username, parameters.password, parameters.role,
        parameters.name, parameters.email])
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// pre: a filter object sent from client
router.post('/find_user', async (req, res, next) => {
    let sql = addFilter('SELECT * FROM Users', req.body);
    try {
        let [result] = await connection.execute(sql)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.post('/delete_user', async (req, res, next) => {
    let sql = addFilter('DELETE FROM Users', req.body);
    try {
        await connection.execute(sql)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

function addFilter(sql, filters, MAP) {
    let inserts = [];
    if (Object.keys(filters).length > 0) {
        let whereClauses = [];
        for (let field in filters) {
            if (MAP) {
                whereClauses.push(`${MAP[field]} = ?`);
            } else {
                whereClauses.push(`${field} = ?`);
            }
            inserts.push(filters[field]);
        }
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }
    sql = mysql.format(sql, inserts);
    return sql;
}




export default router