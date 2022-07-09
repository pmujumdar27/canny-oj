const { Model } = require('objection');

class Problem extends Model {
    static get tableName() {
        return 'problems';
    }

    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get titleColumn() {
        return 'title';
    }

    static get statementColumn() {
        return 'statement';
    }

    static get authorColumn() {
        return 'author';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'statement', 'author', 'sample_input', 'sample_output', 'test_input', 'test_output'],
            properties: {
                id: { type: 'integer' },
                statement: { type: 'string' },
                sample_input: { type: 'string' },
                sample_output: { type: 'string' },
                test_input: { type: 'string' },
                test_output: { type: 'string' },
            }
        };
    }

    static get relationMappings() {
        const User = require('./user');
        return{
            problem_author: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'problems.author',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Problem;