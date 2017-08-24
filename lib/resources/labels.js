const queryAll = require('../utils/queryall')
const util = require('util')
const assert = require('assert')

/**
 * @class
 */
class Labels {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get all labels for a given project.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @return {Promise}
   */
  all(projectId) {
    return queryAll(this.connection, util.format('/projects/%s/labels'), encodeURIComponent(projectId));
  }
}

module.exports = Labels;
