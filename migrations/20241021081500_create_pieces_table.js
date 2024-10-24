/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Pieces', function(table) {
        table.increments('PieceId').primary(); // Primary key
        table.integer('VariantId').unsigned().references('VariantId').inTable('Variants').onDelete('CASCADE'); // Foreign key to Variants table
        table.string('TagUID').unique().notNullable(); // Unique RFID tag identifier
        table.timestamp('CreatedTime').defaultTo(knex.fn.now()); // Created timestamp
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Pieces');
};
