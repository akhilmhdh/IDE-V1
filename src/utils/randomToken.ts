import { randomBytes } from 'crypto';

export default (length: number): string => {
    const byteToken = randomBytes(length);
    return byteToken.toString('hex');
};
