import { connection } from "../../db.js";
import { LOGIN_TOKEN } from "../../env.js";

export async function apiLoginGet(req, res) {
    const loginTokenSize = 20;

    if (typeof req.cookies[LOGIN_TOKEN] !== 'string'
        || req.cookies[LOGIN_TOKEN].length !== loginTokenSize) {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Login token is invalid',
            loggedIn: false,
        }));
    }

    try {
        const selectQuery = 'SELECT userId FROM login_token WHERE token = ?;';
        const dbResponse = await connection.execute(selectQuery, [req.cookies[LOGIN_TOKEN]]);

        if (dbResponse[0].length !== 1) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'User is not logged in',
                loggedIn: false,
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'User is logged in',
            user: {
                id: dbResponse[0][0].userId,
            },
            loggedIn: true,
        }));
    } catch (error) {
        console.error(error);
    }

    return res.send(JSON.stringify({
        type: 'error',
        message: 'API login get: ERROR',
        loggedIn: false,
    }));
}