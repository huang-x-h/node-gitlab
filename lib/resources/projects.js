'use strict';

const util = require('util');
const assert = require('assert');
const debug = require('debug')('resources/projects');

var queryAll = require('../utils/queryall');

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
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {Promise}
   */
  query(projectId) {
    assert(projectId, 'projectId is required.');
    debug('Get a specific project', projectId);
    return this.connection(util.format('/projects/%s', encodeURIComponent(projectId)));
  }

  /**
   * List a group's projects
   * @param {number} groupId
   * @returns {array}
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    debug('List a group\'s projects', groupId);
    return queryAll(this.connection, util.format('groups/%s/projects', groupId))
  }

  /**
   * Stars a given project.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {Promise}
   */
  star(projectId) {
    assert(projectId, 'projectId is required.');
    return this.connection.post(util.format('/projects/%s/star', projectId));
  }
}

module.exports = Projects;
