'use strict';

const util = require('util');
const assert = require('assert');
const debug = require('debug')('resources/projects');

var queryAll = require('../utils/queryall');

/**
 * @class
 */
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
   * Creates a new project owned by the authenticated user.
   * @param {object} project  project information
   * @param {string} project.name The name of the new project. Equals path if not provided.
   * @param {string} project.path Repository name for new project. Generated based on name if not provided (generated lowercased with dashes).
   * @returns {Promise} project information
   */
  create(project) {
    return this.connection.post('/projects', project);
  }

  /**
   * Creates a new project owned by the specified user.
   * @param {object} project  project information
   * @param {string} project.name The name of the new project. Equals path if not provided.
   * @param {string} project.path Repository name for new project. Generated based on name if not provided (generated lowercased with dashes).
   * @param {number} userId The user ID of the project owner
   * @returns {Promise} project information
   */
  createForUser(project, userId) {
    return this.connection.post(util.format('/projects/user/%s', userId), project);
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
   * @returns {Promise}
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    debug('List a group\'s projects', groupId);
    return queryAll(this.connection, util.format('groups/%s/projects', encodeURIComponent(groupId)));
  }

  /**
   * Stars a given project.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {Promise}
   */
  star(projectId) {
    assert(projectId, 'projectId is required.');
    return this.connection.post(util.format('/projects/%s/star', encodeURIComponent(projectId)));
  }
}

module.exports = Projects;
