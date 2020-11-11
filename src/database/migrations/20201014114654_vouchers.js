
exports.up = function(knex) {
    return knex.schema.createTable('vouchers', function(table){
        table.string('codigo').primary();
        table.decimal('desconto').notNullable();
        table.string('data').notNullable();
        table.boolean('status').notNullable();
        table.integer('curso').unsigned().notNullable();
        table.integer('fk_captador').unsigned().notNullable();
        
        table.foreign('curso').references('id_curso').inTable('cursos').onDelete('cascade').onUpdate('cascade');
        table.foreign('fk_captador').references('id').inTable('captadores').onDelete('cascade').onUpdate('cascade');
        })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vouchers');
};
