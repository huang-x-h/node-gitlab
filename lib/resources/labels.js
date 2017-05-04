const queryAll = require('../utils/queryall')
const util = require('util')
const assert = require('assert')

class Labels {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Get all labels for a given project.
   * @param {number} projectId
   * @return {Promise}
   */
  all(projectId) {
    return queryAll(this.connection, util.format('/projects/%s/labels'), projectId)
  }
}

module.exports = Labels
