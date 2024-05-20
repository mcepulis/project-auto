import { createHash } from 'node:crypto';
import { HASH_SALT_PASSWORD } from '../env';

export function hash(str) {
    return createHash('sha256', { encoding: 'utf8' }).update(HASH_SALT_PASSWORD + str).digest('hex');
}