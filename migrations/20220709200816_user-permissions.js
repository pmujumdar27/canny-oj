exports.up = async function(knex) {
    try{
        await knex.schema
        .createTable('user_permissions', (table) => {
            table.increments();
            table.integer('user_id').references('id').inTable('users').unsigned().notNullable();
            table.integer('permission_id').references('id').inTable('permissions').notNullable();
        });
    }
    catch (err) {
        console.log('[KNEX ERROR]: ', err);
        return false;
    }

    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('user_permissions');
    return true;
};