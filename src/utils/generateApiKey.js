import cryto from 'crypto';

export const generateRandomString = (length = 12) => {
    return cryto.randomBytes(length).toString('hex').slice(0, length);
}

export const buildApiKey = (userId, email) => {
    const randomString = generateRandomString();

    return `web-${userId}-${email}-${randomString}`;
};