'use strict';

const util = require('util');
const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Commits {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get a list of repository commits in a project.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @param {object} qs query params
   * @returns {array}
   */
  project(projectId, qs) {
    return queryAll(this.connection, util.format('/projects/%s/repository/commits', encodeURIComponent(projectId)), qs);
  }
}

module.exports = Commits;
