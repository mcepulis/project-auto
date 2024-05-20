import mysql from 'mysql2/promise';

let connection = null;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    await connection.query('USE 48gr_auto');

} catch (error) {
    throw error;
}

export { connection };