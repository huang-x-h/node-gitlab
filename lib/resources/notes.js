'use strict';

const queryAll = require('../utils/queryall');
const util = require('util');

/**
 * @class
 */
class Notes {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * gets a list of all notes for a single issue
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} issueIid The internal ID of a project's issue
   * @returns {Promise}
   */
  all(projectId, issueIid) {
    assert(projectId, 'projectId is required.');
    assert(issueIid, 'issueIid is required.');
    return queryAll(this.connection, util.format('/projects/%s/issues/%s/notes', encodeURIComponent(projectId), issueIid))
  }
}

module.exports = Notes;
