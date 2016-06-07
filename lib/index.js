var Issues = require('./resources/issues');
var Milestones = require('./resources/milestones');
var Projects = require('./resources/projects');
var Tags = require('./resources/tags');

class Gitlab {
  constructor(url, token) {
    this.connection = function(relativeUrl, options) {
      options = Object.assign({
        query: {
          private_token: token
        },
        json: true
      }, options);
      return got(path.join(url, relativeUrl), options);
    }
  }

  get issues() {
    return new Issues(this.connection);
  }

  get milestones() {
    return new Milestones(this.connection)
  }

  get projects() {
    return new Projects(this.connection())
  }

  get tags() {
    return new Tags(this.connection())
  }
}

module.exports = Gitlab;
