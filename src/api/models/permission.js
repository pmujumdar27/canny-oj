const { Model } = require('objection');

class Permission extends Model {
    static get tableName() {
        return 'permissions';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['key', 'description'],
            properties: {
                id: { type: 'integer' },
                key: { type: 'string' },
                description: { type: 'string' }
            }
        };
    }
};

module.exports = Permission;