/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ShoppingBag', function(table) {
        table.increments('BagId').primary(); // Primary key
        table.integer('PieceId').unsigned().references('VariantId').inTable('Variants').onDelete('CASCADE'); // Foreign key to Variants table
        table.string('BagRFID').unique().notNullable(); // Change to string (VARCHAR)
        table.integer('Quantity').notNullable().defaultTo(1); // Quantity of this item in the bag
        table.decimal('TotalAmount', 10, 2).notNullable(); // Total amount for the items in the bag
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ShoppingBag');
};
