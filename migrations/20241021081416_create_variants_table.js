/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Variants', function(table) {
        table.increments('VariantId').primary(); // Primary key
        table.integer('ItemId').unsigned().references('ItemId').inTable('Items').onDelete('CASCADE'); // Foreign key to Items table
        table.string('SizeLabel').notNullable(); // Size label (e.g., S, M, L, XL)
        table.string('ColorName').notNullable(); // Color name (e.g., Blue, Red)
        table.string('ImageUrl'); // Image URL for the variant
        table.integer('StockQuantity').defaultTo(0); // Stock quantity for this specific size and color combination
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Variants');
};
