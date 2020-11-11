
exports.up = function(knex) {
    return knex.schema.createTable('cursos', function(table){
        table.increments('id_curso').primary();
        table.string('nome_curso').notNullable();
        table.decimal('valor').notNullable();
    })

};

exports.down = function(knex) {
  return knex.schema.dropTable('cursos')
};
