'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Notes {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * gets a list of all notes for a single issue
   * @param projectId
   * @param issueId
   * @returns {Promise}
   */
  all(projectId, issueId) {
    return queryAll(this.connection, util.format('/projects/%s/issues/%s/notes', projectId, issueId))
  }
}

module.exports = Notes
