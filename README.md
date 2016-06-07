#node-gitlab
access gitlab api by using node

## Usage

    var Gitlab = require('node-gitlab');
    var gitlab = new Gitlab(url, token);

    gitlab.issues.all(projectId);

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
