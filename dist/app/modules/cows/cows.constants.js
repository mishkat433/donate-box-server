"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowsFilterableField = exports.cowsSearchableFields = exports.cow_label = exports.cow_category = exports.cow_breed = exports.cow_location = void 0;
exports.cow_location = ["Dhaka", "Chattogram", "Barishal", "Rajshahi", "Sylhet", "Comilla", "Rangpur", "Mymensingh"];
exports.cow_breed = ["Brahman", "Nellore", "Sahiwal", "Gir", "Indigenous", "Tharparkar", "Kankrej"];
exports.cow_category = ["Dairy", "Beef", "DualPurpose"];
exports.cow_label = ["for sale", "sold out"];
exports.cowsSearchableFields = ['sellerId', 'label', 'location', 'breed', 'category', 'name'];
exports.cowsFilterableField = [
    'searchTerm',
    'label',
    'location',
    'breed',
    'category',
    'weight',
    'price',
    'minPrice',
    'maxPrice'
];
