const assert = require('assert');
const util = require('util');

/**
 * @class
 */
class Members {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * List all members of a project
   * @param {number|string} projectId The ID or URL-encoded path of the project owned by the authenticated user
   * @returns {Promise}
   */
  project(projectId) {
    assert(projectId, 'projectId is required.');
    return this.connection(util.format('/projects/%s/members', encodeURIComponent(projectId)));
  }

  /**
   * List all members of a group
   * @param {number|string} groupId The ID or URL-encoded path of the group owned by the authenticated user
   * @returns {Promise}
   */
  group(groupId) {
    assert(groupId, 'groupId is required.');
    return this.connection(util.format('/groups/%s/members', encodeURIComponent(groupId)));
  }

  /**
   * Adds a member to a group or project.
   * @param {integer|string} projectOrGroupId The ID or URL-encoded path of the project or group owned by the authenticated user.
   * @param {object} member member information.
   * @param {boolean} [group=false] When value is true, the first parameter is groupId, false is projectId.
   */
  create(projectOrGroupId, member, group = false) {
    assert(projectOrGroupId, 'projectOrGroupId is required.');
    assert(member, 'member is required.');
    assert(member.user_id, 'member.user_id is required.');
    assert(member.access_level, 'member.access_level is required.');
    let id = encodeURIComponent(projectOrGroupId);
    return this.connection.post(`${group ? '/groups' : '/projects'}/${id}/members`, member);
  }

  /**
   * Removes a user from a group or project.
   * @param {integer|string} projectOrGroupId The ID or URL-encoded path of the project or group owned by the authenticated user.
   * @param {integer} userId The user ID of the member
   * @param {boolean} [group=false] When value is true, the first parameter is groupId, false is projectId.
   */
  remove(projectOrGroupId, userId, group = false) {
    assert(projectOrGroupId, 'projectOrGroupId is required.');
    assert(userId, 'userId is required.');
    let id = encodeURIComponent(projectOrGroupId);
    return this.connection.delete(`${group ? '/groups' : '/projects'}/${id}/members/${userId}`);
  }
}

module.exports = Members;
