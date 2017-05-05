'use strict';

const util = require('util');
const assert = require('assert');
const queryAll = require('../utils/queryall');

class Contributors {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get repository contributors list
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {array}
   */
  project(projectId) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('/projects/%s/repository/contributors', projectId));
  }
}
