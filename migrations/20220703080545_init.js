exports.up = async function(knex) {
    try{
        await knex.schema
        .createTable('users', (table) => {
            table.increments();
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.timestamps(true, true);
            table.string('password').notNullable();
        });
    }
    catch (err) {
        console.log('[KNEX ERROR]: ', err);
        return false;
    }

    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
    return true;
};
