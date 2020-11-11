
exports.up = function(knex) {
    return knex.schema.createTable('captadores', function(table){
        table.increments('id').primary();
        table.string('cpf_cap').notNullable();
        table.string('nome_cap').notNullable();
        table.string('email_cap').notNullable();
        table.string('senha').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('captadores');
};
