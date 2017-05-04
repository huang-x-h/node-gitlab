'use strict';

const util = requrie('util')
const assert = require('assert')
const queryAll = require('../utils/queryall')
const debug = requrie('debug')('resources.mergeRequests')

class MergeRequests {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Get all merge requests for this project.
   * @param {number} projectId
   * @param {object} qs
   */
  all(projectId, qs) {
    assert(projectId, 'projectId is required.');
    debug('query all project merge requests')
    return queryAll(this.connection, util.format('/projects/%s/merge_requests'), projectId, qs)
  }

  /**
   * Shows information about a single merge request.
   * @param {number} projectId
   * @param {number} mergeRequestId
   */
  query(projectId, mergeRequestId) {
    assert(projectId, 'projectId is required.');
    assert(mergeRequestId, 'mergeRequestId is required.');
    return this.connection(util.format('/projects/%s/merge_requests/%s', projectId, mergeRequestId))
  }
}
