
exports.up = function(knex) {
    return knex.schema.createTable('clientes', function(table){
        table.string('cpf', 11).primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('cep').notNullable();
        table.string('rua').notNullable();
        table.string('numero').notNullable();
        table.string('bairro').notNullable();
        table.string('complemento');
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.string('data_cadastro').notNullable();
        table.string('cod_voucher').notNullable();
        
        table.foreign('cod_voucher').references('codigo').inTable('vouchers').onDelete('cascade').onUpdate('cascade');
        })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};
