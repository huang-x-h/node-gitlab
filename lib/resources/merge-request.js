'use strict';

const util = requrie('util')
const assert = require('assert')

const OPENED = 'opened'
const CLOSED = 'closed'
const MERGED = 'merged'

class MergeRequest {
  constructor(connection) {
    this.connection = connection
  }

  query(projectId, options) {
    assert(projectId, 'projectId is required.');
    return this.connection(util.format('/projects/%s/merge_request'), {query: options})
  }
}
