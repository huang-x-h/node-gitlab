'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Tags {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * query project all tags
   * @param projectId
   * @returns {Promise}
   */
  all(projectId) {
    return queryAll(this.connection, util.format('/projects/%s/repository/tags', projectId))
  }
}

module.exports = Tags;
