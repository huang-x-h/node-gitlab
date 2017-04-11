'use strict';

const got = require('got');
const Issues = require('./resources/issues');
const Milestones = require('./resources/milestones');
const Projects = require('./resources/projects');
const Tags = require('./resources/tags');
const Notes = require('./resources/notes');
const Users = require('./resources/users');
const MergeRequest = require('./resources/merge-request')
const assert = require('assert')

const helpers = [
  'get',
  'post',
  'put',
  'patch',
  'head',
  'delete'
];

function mappingMethods(connection) {
  helpers.forEach(item => {
    connection[item] = (relativeUrl, options) => connection(relativeUrl, {method: item, body: options})
  })
}

class Gitlab {
  constructor(url, token) {
    assert(url, 'url is required.');
    assert(token, 'token is required.');
    this.connection = function(relativeUrl, options) {
      options = Object.assign({
        retries: 3,
        json: true
      }, options)

      if (!options.query) options.query = {}

      options.query.private_token = token

      return new Promise(function(resolve, reject) {
        got(relativeUrl ? url + relativeUrl : url, options)
          .then(response => resolve(response.body))
          .catch(error => reject(error.response.body))
      })
    }

    mappingMethods(this.connection)
  }

  get issues() {
    return new Issues(this.connection)
  }

  get milestones() {
    return new Milestones(this.connection)
  }

  get projects() {
    return new Projects(this.connection)
  }

  get tags() {
    return new Tags(this.connection)
  }

  get notes() {
    return new Notes(this.connection)
  }

  get users() {
    return new Users(this.connection)
  }

  get mergeRequests() {
    return new MergeRequest(this.connection)
  }
}

module.exports = {
  connect: function(url, token) {
    return new Gitlab(url, token)
  }
};
