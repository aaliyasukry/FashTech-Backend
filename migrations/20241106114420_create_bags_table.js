/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Bags', (table) => {
        table.increments('BagId').primary();   // Primary key for Bag
        table.string('BagRFID', 255).unique(); // RFID for the bag
        table.timestamp('CreatedAt').defaultTo(knex.fn.now()); // CreatedAt timestamp with default value as current time
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Bags');
};
