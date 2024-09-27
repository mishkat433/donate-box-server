import crypto from 'crypto';

export const generateTransactionId = (prefix = 'Tr') => {

    const randomString = crypto.randomBytes(2).toString('hex');

    const timestamp = Date.now().toString(36).toUpperCase();

    return `${prefix}${timestamp}${randomString}`;
}