"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableField = exports.userSearchableFields = exports.userRole = void 0;
exports.userRole = ["admin", "seller", "buyer"];
exports.userSearchableFields = ['userId', 'phoneNumber', 'role'];
exports.userFilterableField = [
    'searchTerm',
    'phoneNumber',
    'name.firstName',
    'budget',
    'address'
];
