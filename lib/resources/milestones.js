var util = require('util');

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
    return this.connection(util.format('/projects/%s/milestones', projectId))
  }

  /**
   * query project milestone by title
   * @param projectId
   * @param title
   * @returns {Promise}
   */
  query(projectId, title) {
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
