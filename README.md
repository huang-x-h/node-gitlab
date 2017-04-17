#node-gitlab
access gitlab api by using node

## Install

**Node.js 4 or higher**

    $ npm install gitlab-node --save

## Usage

```js
// url is your gitlab api path such as http://example.com/api/v3/
// token is your user private token
var gitlab = require('gitlab-node').connect(url, token);

gitlab.issues.proejcts(projectId).then(function(issues) {
  // do something
});
```

## API

- issues
    - all(projectId)

        query project all issues

    - create(projectId, issue)

        create a new project issue

    - query(projectId, issueId)

        gets a single project issue

    - queryByMilestoneId(projectId, milestoneId)

        query project one milestone all issues

- milestones
    - all(projectId)

        query project all milestones

    - query(projectId, milestoneId)

        gets a single project milestone

    - queryByTitle(projectId, title)

        query project milestone by title

- projects
    - all()

        query all projects

- tags
    - all(projectId)

        query project all tags

- notes
    - all(projectId, issueId)

        gets a list of all notes for a single issue

- users
    - all()

        query all users

    - query(userId)

        query single user info.

    - create(user)

        create user

    - update(userId, user)

        update single user info

    - delete(userId)

        delete user
