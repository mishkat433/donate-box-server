"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clearCookies = (res) => {
    res.clearCookie('refresh_token');
    return res;
};
exports.default = clearCookies;
