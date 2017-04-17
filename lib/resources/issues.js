'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util'),
  assert = require('assert');

class Issues {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Get all issues created by the authenticated user.
   * @param {object} qs
   */
  all(qs) {
    return queryAll(this.connection, 'issues', qs)
  }

  /**
   * Get a list of a project's issues.
   * @param {number} projectId
   * @returns {Promise}
   */
  project(projectId, qs) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('projects/%s/issues', projectId), qs)
  }

  /**
   * Get a list of a group's issues.
   * @param {number} groupId
   * @param {object} qs
   * @returns {Promise}
   */
  group(groupId, qs) {
    assert(groupId, 'groupId is required.');
    return queryAll(this.connection, util.format('groups/%s/issues', groupId), qs)
  }

  /**
   * Gets all issues assigned to a single project milestone.
   * @param {number} projectId
   * @param {number} milestoneId
   * @returns {Promise}
   */
  milestone(projectId, milestoneId) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('projects/%s/milestones/%s/issues', projectId, milestoneId))
  }

  /**
   * Get a single project issue.
   *
   * @param {number} projectId
   * @param {number} issueId
   * @returns {Promise}
   */
  query(projectId, issueId) {
    assert(projectId, 'projectId is required.');
    assert(issueId, 'issueId is required.');
    return this.connection(util.format('/projects/%s/issues/%s', projectId, issueId))
  }

  /**
   * create a new project issue
   * @param {number} projectId
   * @param {object} issue
   * @returns {Promise}
   */
  create(projectId, issue) {
    assert(projectId, 'projectId is required.');
    assert(issue.title, 'issue.title is required.');
    return this.connection.post(util.format('/projects/%s/issues', projectId), issue)
  }

  /**
   * Only for admins and project owners. Soft deletes the issue in question.
   * @param {number} projectId
   * @param {number} issueId
   */
  remove(projectId, issueId) {
    assert(projectId, 'projectId is required.');
    assert(issueId, 'issueId is required.');
    return this.connection.delete(util.format('/projects/%s/issues/%s', projectId, issueId))
  }

  /**
   * Subscribes the authenticated user to an issue to receive notifications.
   * @param {number} projectId
   * @param {number} issueId
   */
  subscribe(projectId, issueId) {
    assert(projectId, 'projectId is required.');
    assert(issueId, 'issueId is required.');
    return this.connection.post(util.format('/projects/%s/issues/%s/subscription', projectId, issueId))
  }

  /**
   * Unsubscribes the authenticated user from the issue to not receive notifications
from it.
   * @param {number} projectId
   * @param {number} issueId
   */
  unsubscribe(projectId, issueId) {
    assert(projectId, 'projectId is required.');
    assert(issueId, 'issueId is required.');
    return this.connection.delete(util.format('/projects/%s/issues/%s/subscription', projectId, issueId))
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
