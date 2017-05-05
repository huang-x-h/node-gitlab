'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Milestones {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Returns a list of project milestones.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {object} qs
   * @returns {Promise}
   */
  all(projectId, qs) {
    return queryAll(this.connection, util.format('/projects/%s/milestones', encodeURIComponent(projectId)), qs);
  }

  /**
   * gets a single project milestone
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} milestoneId The ID of the project's milestone
   * @returns {Promise}
   */
  query(projectId, milestoneId) {
    return this.connection(util.format('/projects/%s/milestones/%s', encodeURIComponent(projectId), milestoneId));
  }
}

module.exports = Milestones;
