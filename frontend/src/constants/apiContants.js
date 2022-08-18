import sha1 from 'crypto-js/sha1';

export const API_BASE_URL = 'https://localhost:8041';

export function hashPassword(username, password) {
    var salt = sha1(username + password).toString().substring(0, password.length);
    return sha1(password + salt).toString();
}