const knex = require('knex');
const db = knex(require('../knexfile').development);

function find() {
    return db('schemes');
}

function findById(id){
    return db('schemes').where({ id }).first();
}

function findSteps(id){
        // return db('steps')
        //     .where({ scheme_id: id });
    return db('schemes')
        .innerJoin('steps', 'schemes.id', 'steps.scheme_id')
        .where({ scheme_id: id})
        .select('steps.id', 'scheme_name', 'step_number', 'instructions' )
        .orderBy('steps.step_number', "asc");
}

function add({ scheme_name }) {
    return db('schemes')
        .insert({ scheme_name })
        .then(([id]) => this.findById(id));
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
    ,then(count => (count > 0 ? this.findById(id) : null));
}

function remove(id){
    const scheme = null;
    return this.findById(id)
        .then(data => {
            if(!data) {
                return 0;
            }
            scheme = data;
            return db('schemes')
            .where({ id })
            .del();
        })
        .then(count => (count > 0 ? scheme : null))
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}