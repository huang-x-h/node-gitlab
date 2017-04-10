'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util'),
  assert = require('assert');

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
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('/projects/%s/issues', projectId))
  }

  /**
   * gets a single project issue
   *
   * @param projectId
   * @param issueId
   * @returns {Promise}
   */
  query(projectId, issueId) {
    assert(projectId, 'projectId is required.');
    assert(issueId, 'issueId is required.');
    return this.connection(util.format('/projects/%s/issues/%s', projectId, issueId))
  }

  /**
   * create a new project issue
   * @param projectId
   * @param issue
   * @returns {Promise}
   */
  create(projectId, issue) {
    assert(projectId, 'projectId is required.');
    assert(issue.title, 'issue.title is required.');
    return this.connection.post(util.format('/projects/%s/issues', projectId), issue)
  }

  /**
   * query project one milestone all issues
   * @param projectId
   * @param milestoneId
   * @returns {Promise}
   */
  queryByMilestoneId(projectId, milestoneId) {
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
