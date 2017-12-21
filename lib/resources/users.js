'use strict';

const util = require('util');
const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Users {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * query all users
   * @returns {Promise}
   */
  all() {
    return queryAll(this.connection, '/users')
  }

  /**
   * query single user info.
   * @param {number} userId The ID of a user
   * @returns {Promise}
   */
  query(userId) {
    assert(userId, 'userId is required.');
    return this.connection(util.format('/users/%s', userId));
  }

  /**
   * Get the users list of a project.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @return {Promise}
   */
  project(projectId) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('/projects/%s/users', encodeURIComponent(projectId)));
  }

  /**
   * create user
   * @param {object} user user infromation
   * @returns {Promise}
   */
  create(user) {
    assert(user, 'user is required.');
    assert(user.email, 'user.email is required.');
    assert(user.password, 'user.password is required.');
    assert(user.username, 'user.username is required.');
    assert(user.name, 'user.name is required.');
    return this.connection.post('/users', user);
  }

  /**
   * update single user info
   * @param {number} userId The ID of a user
   * @param {object} user user infromation
   * @returns {Promise}
   */
  update(userId, user) {
    assert(userId, 'user is required.');
    return this.connection.put(util.format('/users/%s', userId), user)
  }

  /**
   * delete user
   * @param {number} userId The ID of a user
   * @returns {Promise}
   */
  delete(userId) {
    assert(userId, 'userId is required.');
    return this.connection.delete(util.format('/users/%s', userId))
  }
}

module.exports = Users;
