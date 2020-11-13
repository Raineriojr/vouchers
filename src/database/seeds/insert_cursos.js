
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cursos').del()
    .then(function () {
      // Inserts seed entries
      return knex('cursos').insert([
        {id_curso: 1, nome_curso: 'Engenharia de Computação', valor: 1629.31},
        {id_curso: 2, nome_curso: 'Pedagogia', valor: 735.47},
        {id_curso: 3, nome_curso: 'Radiologia', valor: 876.35}
      ]);
    });
};
