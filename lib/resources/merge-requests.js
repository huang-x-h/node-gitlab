'use strict';

const util = require('util');
const assert = require('assert');
const queryAll = require('../utils/queryall');
const debug = require('debug')('resources.mergeRequests');

/**
 * @class
 */
class MergeRequests {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get all merge requests for this project.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @param {object} qs query params
   */
  all(projectId, qs) {
    assert(projectId, 'projectId is required.');
    debug('query all project merge requests');
    return queryAll(this.connection, util.format('/projects/%s/merge_requests'), encodeURIComponent(projectId), qs)
  }

  /**
   * Shows information about a single merge request.
   * @param {number|string} projectId The ID or URL-encoded path of the project
   * @param {number} mergeRequestIid The internal ID of the merge request
   */
  query(projectId, mergeRequestIid) {
    assert(projectId, 'projectId is required.');
    assert(mergeRequestIid, 'mergeRequestIid is required.');
    return this.connection(util.format('/projects/%s/merge_requests/%s', encodeURIComponent(projectId), mergeRequestIid))
  }
}

module.exports = MergeRequests;
