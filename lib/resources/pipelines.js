const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Pipelines {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * List project pipelines
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {object} qs
   */
  project(projectId, qs) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, `/projects/${encodeURIComponent(projectId)}/pipelines`, qs);
  }

  /**
   * Get a single pipeline
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {integer} pipelineId The ID of a pipeline
   */
  query(projectId, pipelineId) {
    assert(projectId, 'projectId is required.');
    assert(pipelineId, 'pipelineId is required.');
    return this.connection.get(`/projects/${encodeURIComponent(projectId)}/pipelines/${pipelineId}`);
  }

  /**
   * Create a new pipeline
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {string} [ref='master'] Reference to commit
   */
  create(projectId, ref='master') {
    assert(projectId, 'projectId is required.');
    return this.connection.post(`/projects/${encodeURIComponent(projectId)}/pipeline?ref=${ref}`);
  }
}

module.exports = Pipelines;
