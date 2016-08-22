'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Issues {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * query project all issues
   * @param projectId
   * @returns {Promise}
   */
  all(projectId) {
    return queryAll(this.connection, util.format('/projects/%s/issues', projectId))
  }

  /**
   * query project one milestone all issues
   * @param projectId
   * @param milestoneId
   * @returns {Promise}
   */
  query(projectId, milestoneId) {
    return this.all(projectId).then(function(issues) {
      issues = issues.filter(function(issue) {
        if (issue.milestone && (issue.milestone.id === milestoneId)) {
          return true
        }
      });

      return issues
    })
  }
}

module.exports = Issues;
