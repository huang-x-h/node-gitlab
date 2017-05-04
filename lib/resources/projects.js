'use strict';

var queryAll = require('../utils/queryall');
const utils = require('utils');

class Projects {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Get a list of visible projects for authenticated user.
   * @returns {Promise}
   */
  all() {
    return queryAll(this.connection, '/projects');
  }

  /**
   * Get a specific project.
   * @param {number|string} id The ID or URL-encoded path of the project
   * @returns {Promise}
   */
  query(id) {
    assert(id, 'id is required.');
    return this.connection(utils.format('/projects/%s', encodeURIComponent(id)));
  }

  /**
   * List a group's projects
   * @param {number} groupId
   * @returns {Promise}
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    return queryAll(this.connection, utils.format('groups/%s/projects', groupId))
  }

  /**
   * Stars a given project.
   * @param {number} projectId
   * @returns {Promise}
   */
  star(projectId) {
    assert(projectId, 'projectId is required.');
    return this.connection.post(utils.format('/projects/:id/star', projectId));
  }
}

module.exports = Projects;
