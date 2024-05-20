import { connection } from "../../db.js";
import { hash } from "../../lib/hash.js";

export async function apiRegisterPost(req, res) {
    const minEmailLength = 6;
    const maxEmailLength = 50;
    const minPasswordLength = 12;
    const maxPasswordLength = 100;
    const { email, password } = req.body;

    if (typeof email !== 'string') {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Email has to be a string value',
        }));
    }

    if (email.length < minEmailLength) {
        return res.send(JSON.stringify({
            type: 'error',
            message: `Email is too short, has to be at least ${minEmailLength} symbols`,
        }));
    }

    if (email.length > maxEmailLength) {
        return res.send(JSON.stringify({
            type: 'error',
            message: `Email is too long, has to be no more than ${maxEmailLength} symbols`,
        }));
    }

    if (typeof password !== 'string') {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Password has to be a string value',
        }));
    }

    if (password.length < minPasswordLength) {
        return res.send(JSON.stringify({
            type: 'error',
            message: `Password is too short, has to be at least ${minPasswordLength} symbols`,
        }));
    }

    if (password.length > maxPasswordLength) {
        return res.send(JSON.stringify({
            type: 'error',
            message: `Password is too long, has to be no more than ${maxPasswordLength} symbols`,
        }));
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const dbResponse = await connection.execute(selectQuery, [email]);

        if (dbResponse[0].length > 0) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'User already exists',
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Problems while trying to register a user',
        }));
    }

    try {
        const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [email, hash(password)]);

        if (dbResponse[0].affectedRows !== 1) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'User could not be created, for some weird reason',
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'User successfully registered',
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Problems while trying to register a user',
        }));
    }
}