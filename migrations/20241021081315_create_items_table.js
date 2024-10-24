/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Items', function(table) {
        table.increments('ItemId').primary(); // Primary key
        table.string('Name').notNullable(); // Product name
        table.string('Description'); // Description of the product
        table.decimal('Price', 10, 2).notNullable(); // Price of the product
        table.integer('StockQuantity').defaultTo(0); // Total stock quantity of the product
        table.integer('CategoryId').unsigned().references('CategoryId').inTable('Categories').onDelete('CASCADE'); // Foreign key to Categories table
        table.string('Material'); // Product material (e.g., cotton)
        table.string('Type'); // Product type (e.g., Shirt, Pants)
        table.timestamp('CreatedTime').defaultTo(knex.fn.now()); // Created timestamp
        table.timestamp('UpdatedTime').defaultTo(knex.fn.now()); // Updated timestamp
        table.integer('UpdatedById'); // User ID who last updated the product
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Items');
};
