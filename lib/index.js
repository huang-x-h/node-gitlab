'use strict';

const got = require('got');
const assert = require('assert');

const Commits = require('./resources/commits');
const Contributors = require('./resources/contributors');
const Groups = require('./resources/groups');
const Issues = require('./resources/issues');
const Labels = require('./resources/labels');
const Members = require('./resources/members');
const MergeRequests = require('./resources/merge-requests');
const Milestones = require('./resources/milestones');
const Projects = require('./resources/projects');
const Tags = require('./resources/tags');
const Notes = require('./resources/notes');
const Users = require('./resources/users');

const helpers = [
  'get',
  'post',
  'put',
  'patch',
  'head',
  'delete'
]

function mappingMethods(connection) {
  helpers.forEach(item => {
    connection[item] = (relativeUrl, options) => connection(relativeUrl, { method: item, body: options })
  })
}

/**
 * @class
 */
class Gitlab {
  constructor(url, token) {
    assert(url, 'url is required.');
    assert(token, 'token is required.');
    this.connection = function (relativeUrl, options) {
      options = Object.assign({
        retries: 3,
        json: true
      }, options)

      if (!options.query) options.query = {}

      options.query.private_token = token

      return new Promise(function (resolve, reject) {
        got(relativeUrl ? url + relativeUrl : url, options)
          .then(response => resolve(response.body))
          .catch(error => reject(error.response.body));
      })
    }

    mappingMethods(this.connection);
  }

  /**
   * issues api
   * @see {@link Issues}
   */
  get issues() {
    return new Issues(this.connection);
  }

  /**
   * milestones api
   * @see {@link Milestones}
   */
  get milestones() {
    return new Milestones(this.connection);
  }

  /**
   * projects api
   * @see {@link Projects}
   */
  get projects() {
    return new Projects(this.connection);
  }

  /**
   * tags api
   * @see {@link Tags}
   */
  get tags() {
    return new Tags(this.connection);
  }

  /**
   * notes api
   * @see {@link Notes}
   */
  get notes() {
    return new Notes(this.connection);
  }

  /**
   * users api
   * @see {@link Users}
   */
  get users() {
    return new Users(this.connection);
  }

  /**
   * mergeRequests api
   * @see {@link MergeRequests}
   */
  get mergeRequests() {
    return new MergeRequests(this.connection)
  }

  /**
   * groups api
   * @see {@link Groups}
   */
  get groups() {
    return new Groups(this.connection);
  }

  /**
   * members api
   * @see {@link Members}
   */
  get members() {
    return new Members(this.connection);
  }

  /**
   * commits api
   * @see {@link Commits}
   */
  get commits() {
    return new Commits(this.connection);
  }

  /**
   * contributors api
   * @see {@link Contributors}
   */
  get contributors() {
    return new Contributors(this.connection);
  }
}

/**
 * @example
 * const gitlab = require('gitlab-node').connect(url, token);
 *
 * @module gitlab-node
 */
module.exports = {
  /**
   * @param {string} url gitlab api path
   * @param {string} token user private token
   * @return {Gitlab}
   */
  connect: function (url, token) {
    return new Gitlab(url, token);
  }
};
