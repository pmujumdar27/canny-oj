exports.up = async function(knex) {
    try{
        await knex.schema
        .createTable('permissions', (table) => {
            table.increments();
            table.string('key').notNullable().unique();
            table.string('description').notNullable();
        });
    }
    catch (err) {
        console.log('[KNEX ERROR]: ', err);
        return false;
    }

    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('permissions');
    return true;
};
