'use strict';

const util = require('util')
const assert = require('assert')
const queryAll = require('../utils/queryall')

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
   * @param userId
   * @returns {Promise}
   */
  query(userId) {
    assert(userId, 'userId is required.');
    return this.connection(util.format('/users/%s', userId))
  }

  /**
   * create user
   * @param user user infromation
   * @returns {Promise}
   */
  create(user) {
    assert(user, 'user is required.');
    assert(user.email, 'user.email is required.');
    assert(user.password, 'user.password is required.');
    assert(user.username, 'user.username is required.');
    assert(user.name, 'user.name is required.');
    return this.connection.post('/users', user)
  }

  /**
   * update single user info
   * @param userId
   * @param user
   * @returns {Promise}
   */
  update(userId, user) {
    assert(userId, 'user is required.');
    return this.connection.put(util.format('/users/%s', userId), user)
  }

  /**
   * delete user
   * @param userId
   * @returns {Promise}
   */
  delete(userId) {
    assert(userId, 'userId is required.');
    return this.connection.delete(util.format('/users/%s', userId))
  }
}

module.exports = Users
