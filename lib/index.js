'use strict';

var got = require('got');
var Issues = require('./resources/issues');
var Milestones = require('./resources/milestones');
var Projects = require('./resources/projects');
var Tags = require('./resources/tags');
var Notes = require('./resources/notes');

class Gitlab {
  constructor(url, token) {
    this.connection = function(relativeUrl, options) {
      options = Object.assign({
        retries: 3,
        json: true
      }, options)

      if (!options.query) options.query = {}

      options.query.private_token = token

      return new Promise(function(resolve, reject) {
        got(relativeUrl ? url + relativeUrl : url, options)
          .then(response => resolve(response.body))
          .catch(error => reject(error.response.body))
      })
    }
  }

  get issues() {
    return new Issues(this.connection)
  }

  get milestones() {
    return new Milestones(this.connection)
  }

  get projects() {
    return new Projects(this.connection)
  }

  get tags() {
    return new Tags(this.connection)
  }

  get notes() {
    return new Notes(this.connection)
  }
}

module.exports = {
  connect: function(url, token) {
    return new Gitlab(url, token)
  }
};
