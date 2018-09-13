const assert = require('assert');
const queryAll = require('../utils/queryall');

/**
 * @class
 */
class Groups {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Get a list of visible groups for the authenticated user. When accessed without
authentication, only public groups are returned.
   * @param {object} qs query information
   */
  all(qs) {
    return queryAll(this.connection, '/groups', qs);
  }

  /**
   * Get all details of a group. This endpoint can be accessed without authentication
if the group is publicly accessible.
   * @param {integer|string} groupId The ID or URL-encoded path of the group owned by the authenticated user
   */
  query(groupId) {
    assert(groupId, 'groupId is required.');
    return this.connection.get(`/groups/${groupId}`);
  }

  /**
   * Creates a new project group. Available only for users who can create groups.
   * @param {object} group group information
   */
  create(group) {
    assert(group, 'group is required.');
    assert(group.name, 'group.name is required.');
    assert(group.path, 'group.path is required.');
    return this.connection.post('/groups', group);
  }
}

module.exports = Groups;
