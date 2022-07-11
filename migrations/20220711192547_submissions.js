exports.up = async function(knex) {
    try{
        await knex.schema
        .createTable('submissions', (table) => {
            table.increments();
            table.string('solution_file').notNullable().unique();
            table.integer('user_id').references('id').inTable('users').unsigned().notNullable();
            table.integer('problem_id').references('id').inTable('problems').unsigned().notNullable();
            table.string('status').notNullable();
            table.string('language').notNullable();
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
    await knex.schema.dropTableIfExists('submissions');
    return true;
};
