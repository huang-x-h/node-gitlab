const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Repositories {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   *
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {object} qs query information
   */
  tree(projectId, qs) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, `/projects/${encodeURIComponent(projectId)}/repository/tree`, qs);
  }
}

module.exports = Repositories;
