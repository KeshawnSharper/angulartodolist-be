
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, message: 'rowValue1',date: '2020-3-2',time: '20:20',user_id: 1},
      ]);
    });
};
