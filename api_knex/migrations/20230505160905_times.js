/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("times", tbl => {
        tbl.increments ('id') ;
        tbl.text ("nome", 255) 
           .notNullable();
        tbl.text ("local", 255) 
           .notNullable();
        tbl.text ("apelido", 255);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists ("times");
};
