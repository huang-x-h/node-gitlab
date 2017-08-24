'use strict';

const util = require('util');
const assert = require('assert');

const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Tags {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * List project repository tags
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {array}
   */
  all(projectId) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('/projects/%s/repository/tags', encodeURIComponent(projectId)));
  }
}

module.exports = Tags;
