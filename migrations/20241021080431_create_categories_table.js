/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Categories', function(table) {
        table.increments('CategoryId').primary(); // Primary key
        table.string('CategoryName').notNullable(); // Category name (e.g., Men, Women)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Categories');
};
