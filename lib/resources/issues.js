'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util'),
  assert = require('assert');

/**
 * @class
 */
class Issues {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Get all issues created by the authenticated user.
   * @param {object} qs query params
   * @return {Promise}
   */
  all(qs) {
    return queryAll(this.connection, 'issues', qs)
  }

  /**
   * Get a list of a project's issues.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @returns {Promise}
   */
  project(projectId, qs) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, util.format('projects/%s/issues', encodeURIComponent(projectId)), qs)
  }

  /**
   * Get a list of a group's issues.
   * @param {number|string} groupId The ID or URL-encoded path of the group owned by the authenticated user
   * @param {object} qs query params
   * @returns {Promise}
   */
  group(groupId, qs) {
    assert(groupId, 'groupId is required.');
    return queryAll(this.connection, util.format('groups/%s/issues', encodeURIComponent(groupId)), qs)
  }

  /**
   * Gets all issues assigned to a single project milestone.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} milestoneId The ID of a project milestone
   * @returns {Promise}
   */
  milestone(projectId, milestoneId) {
    assert(projectId, 'projectId is required.');
    assert(milestoneId, 'milestoneId is required.');
    return queryAll(this.connection, util.format('projects/%s/milestones/%s/issues', encodeURIComponent(projectId), milestoneId));
  }

  /**
   * Get a single project issue.
   *
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} issueIid The internal ID of a project's issue
   * @returns {Promise}
   */
  query(projectId, issueIid) {
    assert(projectId, 'projectId is required.');
    assert(issueIid, 'issueIid is required.');
    return this.connection(util.format('/projects/%s/issues/%s', encodeURIComponent(projectId), issueIid))
  }

  /**
   * create a new project issue
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {object} issue
   * @returns {Promise}
   */
  create(projectId, issue) {
    assert(projectId, 'projectId is required.');
    assert(issue.title, 'issue.title is required.');
    return this.connection.post(util.format('/projects/%s/issues', encodeURIComponent(projectId)), issue)
  }

  /**
   * Only for admins and project owners. Soft deletes the issue in question.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} issueIid The internal ID of a project's issue
   */
  remove(projectId, issueIid) {
    assert(projectId, 'projectId is required.');
    assert(issueIid, 'issueIid is required.');
    return this.connection.delete(util.format('/projects/%s/issues/%s', encodeURIComponent(projectId), issueIid));
  }

  /**
   * Subscribes the authenticated user to an issue to receive notifications.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} issueIid The internal ID of a project's issue
   */
  subscribe(projectId, issueIid) {
    assert(projectId, 'projectId is required.');
    assert(issueIid, 'issueIid is required.');
    return this.connection.post(util.format('/projects/%s/issues/%s/subscription', encodeURIComponent(projectId), issueIid))
  }

  /**
   * Unsubscribes the authenticated user from the issue to not receive notifications
from it.
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {number} issueIid The internal ID of a project's issue
   */
  unsubscribe(projectId, issueIid) {
    assert(projectId, 'projectId is required.');
    assert(issueIid, 'issueIid is required.');
    return this.connection.delete(util.format('/projects/%s/issues/%s/subscription', encodeURIComponent(projectId), issueIid));
  }
}

module.exports = Issues;
