const knex = require('knex');
const db = knex(require('../knexfile').development);

function find() {
    return db('schemes');
}

function findById(id){
    return db('schemes').where({ id }).first();
}

function findSteps(id){
    return db('steps').where({ id });
}

function add({ scheme_name }) {
    return db('schemes').insert({ scheme_name });
}

function update(id, { scheme_name }) {
    return db('schemes').where({ id }).update({ scheme_name });
}

function remove(id){
    return db('schemes').where({ id }).del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}