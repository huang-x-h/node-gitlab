const queryAll = require('../utils/queryall');

class Groups {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   *
   */
  owned() {
    return queryAll(this.connection, 'groups/owned');
  }

  all() {
    return queryAll(this.connection, 'groups');
  }

  query(groupId) {

  }

  create() {

  }

  update() {

  }

  remove() {

  }
}

