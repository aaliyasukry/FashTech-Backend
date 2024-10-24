// models/categoryModel.js
const knex = require('../config/database');

class Category {
    static async create(categoryName) {
        return await knex('Categories').insert({ CategoryName: categoryName });
    }

    static async getAll() {
        return await knex('Categories').select('*');
    }

    static async getById(id) {
        return await knex('Categories').where({ CategoryId: id }).first();
    }

    static async update(id, categoryName) {
        return await knex('Categories').where({ CategoryId: id }).update({ CategoryName: categoryName });
    }

    static async delete(id) {
        return await knex('Categories').where({ CategoryId: id }).del();
    }
}

module.exports = Category;
