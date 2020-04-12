
exports.up = function(knex) {
  return knex.schema.createTable('ong_user', function (table) {
    table.integer('user_id').notNullable();
    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
    table.foreign('user_id').references('id').inTable('users');

    table.primary(['user_id', 'ong_id']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ong_user')
};
