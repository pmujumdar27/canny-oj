exports.up = async function(knex) {
    try{
        await knex.schema
        .createTable('problems', (table) => {
            table.increments();
            table.string('title').notNullable().unique();
            table.string('statement').notNullable();
            table.integer('author').references('id').inTable('users').unsigned().notNullable();
            table.string('sample_input').notNullable();
            table.string('sample_output').notNullable();
            table.string('test_input').notNullable();
            table.string('test_output').notNullable();
            table.timestamps(true, true);
        });
    }
    catch (err) {
        console.log('[KNEX ERROR]: ', err);
        return false;
    }

    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('problems');
    return true;
};
