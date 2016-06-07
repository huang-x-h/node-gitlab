/**
 * Created by huangxinghui on 2015/6/15.
 */

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
