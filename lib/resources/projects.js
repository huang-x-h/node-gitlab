'use strict';

var queryAll = require('../utils/queryall');
const utils = require('utils');

class Projects {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * query all projects
   * @returns {Promise}
   */
  all() {
    return queryAll(this.connection, 'projects');
  }

  /**
   * List a group's projects
   * @param {number} groupId
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    return queryAll(this.connection, utils.format('groups/%s/projects', groupId))
  }
}

module.exports = Projects;
