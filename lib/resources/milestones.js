'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Milestones {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Returns a list of project milestones.
   * @param {number} projectId
   * @param {object} qs
   * @returns {Promise}
   */
  all(projectId, qs) {
    return queryAll(this.connection, util.format('/projects/%s/milestones', projectId), qs)
  }

  /**
   * gets a single project milestone
   * @param {number} projectId
   * @param {number} milestoneId
   * @returns {Promise}
   */
  query(projectId, milestoneId) {
    return this.connection(util.format('/projects/%s/milestones/%s', projectId, milestoneId))
  }

  /**
   * query project milestone by title
   * @param projectId
   * @param title
   * @returns {Promise}
   */
  queryByTitle(projectId, title) {
    return this.all(projectId).then(function(milestones) {
      milestones = milestones.filter(function(milestone) {
        if (milestone.title.toLowerCase() === title.toLowerCase()) {
          return true;
        }
      })

      if (milestones.length > 0) return Promise.resolve(milestones[0])
    })
  }
}

module.exports = Milestones;
