import dotenv from 'dotenv';

console.clear();
const processArgs = {};

const currentArgs = process.argv.slice(2);

for (const arg of currentArgs) {
    if (arg.startsWith('--')) {
        const data = arg.slice(2).split('=');
        if (data.length === 1) {
            processArgs[data[0]] = true;
        }
        if (data.length === 2) {
            processArgs[data[0]] = data[1];
        }
    }
}

dotenv.config({
    path: processArgs.env ?? '.env',
});

const e = process.env;

export const CLIENT_PORT = e.CLIENT_PORT ? +e.CLIENT_PORT : 4820;
export const SERVER_PORT = e.SERVER_PORT ? +e.SERVER_PORT : 4821;
export const DOMAIN = e.DOMAIN ?? 'localhost';
export const LOGIN_TOKEN = e.LOGIN_TOKEN ?? 'token';
export const HASH_SALT_PASSWORD = e.HASH_SALT_PASSWORD ?? '';
export const SESSION_DURATION = e.SESSION_DURATION ? +e.SESSION_DURATION : 3600;