const knex = require('../config/database');

class Bag {
    // Create a new bag
    static async create(bagRFID) {
        return knex('Bags').insert({
            BagRFID: bagRFID,
            CreatedAt: new Date() 
        }).returning('BagID');
    }

    // Find a bag by its BagID
    static async findById(bagId) {
        return knex('Bags').where('BagID', bagId).first();
    }

    static async getAll() {
        return knex('Bags').select('*');
    }
}

module.exports = Bag;
