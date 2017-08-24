'use strict';

const util = require('util');

/**
 * @class
 */
class Members {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * List all members of a project
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @returns {Promise}
   */
  project(projectId) {
    assert(projectId, 'projectId is required.');
    return this.connection(util.format('/projects/%s/members', encodeURIComponent(projectId)));
  }

  /**
   * List all members of a group
   * @param {number|string} groupId The ID or URL-encoded path of the group owned by the authenticated user
   * @returns {Promise}
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    return this.connection(util.format('/groups/%s/members', encodeURIComponent(groupId)));
  }
}

module.exports = Members;
