/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('BagItems', (table) => {
        table.increments('ID').primary();
        table.integer('BagId').references('BagID').inTable('Bags').onDelete('CASCADE');
        table.integer('PieceId').unsigned().references('PieceId').inTable('Pieces').onDelete('CASCADE');
        table.integer('Quantity').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('BagItems');
};
