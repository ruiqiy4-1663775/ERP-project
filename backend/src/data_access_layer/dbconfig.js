import mysqlv2 from 'mysql2/promise';


const option = {
    connectionLimit: 10,
    host: 'richy.crfivfcajyse.us-west-1.rds.amazonaws.com', // replace with your RDS instance endpoint
    user: 'richy', // replace with your MySQL username
    password: '518956xin', // replace with your MySQL password
    database: 'lionsfloor', // replace with your database name
    timezone: 'Z'
}
export const connection = mysqlv2.createPool(option);



// async function execute(sql, array) {
//     let conn = await mysqlv2.createConnection(option)
//     // console.log('I am working')
//     try {
//         if (array) {
//             sql = mysql.format(sql, array)
//         }
//         let result = await conn.execute(sql)
//         return result
//     } catch (err) {
//         throw err
//     } finally {
//         conn.end()
//     }
// }

// export const connection = {execute}

// Set up error handler
connection.on('connection', (conn) => {
    console.log('New connection established');
    const intervalId = setInterval(() => ping2(conn), 10000);
    conn.on('error', (err) => {
        if (err.code === 'ECONNRESET') {
            console.error('Connection was reset, connect again');
            clearInterval(intervalId)
            conn.release();
        }
        // throw err; // Handle other errors as you see fit
    });
});

// let i = 0
async function ping2(con) {
    try {
        await con.execute('SELECT 1');
    } catch (err) {
        ping2(con)
    }
}

// async function ping() {
//     try {
//         await connection.execute('SELECT 1');
//         // console.log('ping!!!')
//     } catch (err) {
//         ping()
//     }
// }

// // If still not work, try this solution
// setInterval(ping, 10000); // every 10 seconds