/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Requests', function(table) {
        table.increments('RequestId').primary(); // Primary key
        table.integer('VariantId').unsigned().references('VariantId').inTable('Variants').onDelete('CASCADE'); // Foreign key to Variants table
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Requests');
};
