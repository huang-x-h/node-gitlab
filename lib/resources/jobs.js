const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Jobs {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get a list of jobs in a project.
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {string|array} [scope] The scope of jobs to show, one or array of: created, pending, running, failed, success, canceled, skipped, manual; showing all jobs if none provided
   */
  project(projectId, scope) {
    assert(projectId, 'projectId is required.');
    return queryAll(this.connection, `/projects/${encodeURIComponent(projectId)}/jobs`, scope ? { scope } : null);
  }

  /**
   * Get a list of jobs for a pipeline.
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {integer} pipelineId The ID of a pipeline
   * @param {string|array} [scope] The scope of jobs to show, one or array of: created, pending, running, failed, success, canceled, skipped, manual; showing all jobs if none provided
   */
  pipeline(projectId, pipelineId, scope) {
    assert(projectId, 'projectId is required.');
    assert(pipelineId, 'pipelineId is required.');
    return this.connection.get(`/projects/${encodeURIComponent(projectId)}/pipelines/${pipelineId}/jobs`, scope ? { scope } : null);
  }

  /**
   * Triggers a manual action to start a job.
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {integer} jobId The ID of a job
   */
  play(projectId, jobId) {
    assert(projectId, 'projectId is required.');
    assert(jobId, 'jobId is required.');
    return this.connection.post(`/projects/${encodeURIComponent(projectId)}/jobs/${jobId}/play`);
  }

  /**
   * Get a trace of a specific job of a project
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {integer} jobId The ID of a job
   */
  trace(projectId, jobId) {
    assert(projectId, 'projectId is required.');
    assert(jobId, 'jobId is required.');
    return this.connection.get(`/projects/${encodeURIComponent(projectId)}/jobs/${jobId}/trace`);
  }

  /**
   * Cancel a single job of a project
   * @param {integer|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @param {integer} jobId The ID of a job
   */
  cancel(projectId, jobId) {
    assert(projectId, 'projectId is required.');
    assert(jobId, 'jobId is required.');
    return this.connection.post(`/projects/${encodeURIComponent(projectId)}/jobs/${jobId}/cancel`);
  }
}

module.exports = Jobs;
