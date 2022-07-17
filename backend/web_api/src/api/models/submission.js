const { Model } = require('objection');

class Submission extends Model {
    static get tableName() {
        return 'submissions';
    }

    $beforeInsert() {
        this.created_at = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['solution_file', 'user_id', 'problem_id', 'status'],
            properties: {
                id: { type: 'integer' },
                solution_file: { type: 'string' },
                user_id: { type: 'integer' },
                problem_id: { type: 'integer' },
                status: {
                    type: 'string',
                    enum: ['WA', 'AC', 'TLE', 'IQ', 'RN', 'RTE', 'CE'],
                    default: 'IQ'
                },
                language: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        const User = require('./user');
        const Problem = require('./problem');
        return {
            submitted_by: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'submissions.user_id',
                    to: 'users.id'
                }
            },
            for_problem: {
                relation: Model.BelongsToOneRelation,
                modelClass: Problem,
                join: {
                    from: 'submissions.problem_id',
                    to: 'problems.id'
                }
            }
        };
    }
}

module.exports = Submission;