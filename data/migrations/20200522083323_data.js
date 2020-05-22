exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string("first_name",128);
        table.string("last_name",128);
        table.string("password",128).notNullable();
        table.string("email",128).notNullable().unique()
        table.string("gender",128);
        table.date('birthday');
        table.boolean('online');
      })
      .createTable('todo', function (table) {
        table.increments()
        table.string("message",128).notNullable()
        table.date("date",128).notNullable();
        table.time("time",128).notNullable()
        table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
      
      })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
    .dropTableIfExists("todo")
};
