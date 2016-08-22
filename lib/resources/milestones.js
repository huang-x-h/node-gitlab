'use strict';

var queryAll = require('../utils/queryall'),
  util = require('util');

class Milestones {
  constructor(connection) {
    this.connection = connection
  }

  /**
   * query project all milestones
   * @param projectId
   * @returns {Promise}
   */
  all(projectId) {
    return queryAll(this.connection, util.format('/projects/%s/milestones', projectId))
  }

  /**
   * gets a single project milestone
   * @param projectId
   * @param milestoneId
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
