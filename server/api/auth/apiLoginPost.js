import { connection } from "../../db.js";
import { DOMAIN, LOGIN_TOKEN, SESSION_DURATION } from "../../env.js";
import { hash } from "../../lib/hash.js";
import { randomString } from "../../lib/randomString.js";

export async function apiLoginPost(req, res) {
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

    let userObj = null;

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const dbResponse = await connection.execute(selectQuery, [email, hash(password)]);

        if (dbResponse[0].length === 0) {
            return res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
            }));
        } else if (dbResponse[0].length === 1) {
            userObj = dbResponse[0][0];
        } else {
            return res.send(JSON.stringify({
                message: 'Problems while trying to login user',
                loggedIn: false,
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Could not find user',
            loggedIn: false,
        }));
    }

    const randomLoginToken = randomString(20);

    try {
        const insertQuery = `INSERT INTO login_token (userId, token) VALUES (?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [userObj.id, randomLoginToken]);

        if (dbResponse[0].affectedRows !== 1) {
            return res.send(JSON.stringify({
                message: 'Problems while trying to login user',
                loggedIn: false,
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Problems while trying to login user',
            loggedIn: false,
        }));
    }

    const cookie = [
        LOGIN_TOKEN + '=' + randomLoginToken,
        'domain=' + DOMAIN,
        'path=/',
        'max-age=' + SESSION_DURATION,
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ].join('; ');

    return res.set('Set-Cookie', cookie).send(JSON.stringify({
        message: 'Welcome',
        loggedIn: true,
        userId: userObj.id,
    }));
}