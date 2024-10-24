const knex = require('../config/database'); 

class Variant {
    static async create(variantData) {
        const [id] = await knex('Variants').insert(variantData).returning('VariantId');
        return id;
    }

    static async getAll() {
        return await knex('Variants').select('*');
    }

    static async getById(id) {
        return await knex('Variants').where({ VariantId: id }).first();
    }

    static async update(id, variantData) {
        const count = await knex('Variants').where({ VariantId: id }).update(variantData);
        return count > 0; // Returns true if the variant was updated
    }

    static async delete(id) {
        const count = await knex('Variants').where({ VariantId: id }).del();
        return count > 0; // Returns true if the variant was deleted
    }
}

module.exports = Variant;
