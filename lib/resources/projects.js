'use strict';

var queryAll = require('../utils/queryall');

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
}

module.exports = Projects;
