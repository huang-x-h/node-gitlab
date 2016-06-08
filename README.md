#node-gitlab
access gitlab api by using node

## Install

**Node.js 4 or higher**

    $ npm install @huang.xinghui/node-gitlab --save

## Usage

    // url is your gitlab api path such as http://example.com/api/v3/
    // token is your user private token
    var gitlab = require('@huang.xinghui/node-gitlab').connect(url, token);

    gitlab.issues.all(projectId).then(function(issues) {
      // do something
    });

## API

- issues
    - all(projectId)
        query project all issues
    - query(projectId, milestoneId)
        query project one milestone all issues
- milestones
    - all(projectId)
        query project all milestones
    - query(projectId, title)
        query project milestone by title
- projects
    - all()
        query all projects
- tags
    - all(projectId)
        query project all tags
