const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get usernameColumn() {
        return 'username';
    }

    static get emailColumn() {
        return 'email';
    }

    static get relationMappings() {
        const Permission = require('./permission');
        return {
            permissions: {
                relation: Model.ManyToManyRelation,
                modelClass: Permission,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'user_permissions.user_id',
                        to: 'user_permissions.permission_id'
                    },
                    to: 'permissions.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email', 'password'],
            properties: {
                id: { type: 'integer'},
                username: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }
};

module.exports = User;