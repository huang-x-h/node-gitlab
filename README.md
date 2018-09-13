# node-gitlab

> access gitlab api by using node, support v4

## Install

    $ npm install gitlab-node --save

## Usage

1. Use private token

```js
// url is your gitlab api path such as http://example.com/api/v4/
// token is your user private token
const gitlab = require('gitlab-node').connect(url, token);

gitlab.issues.proejcts(projectId).then(function(issues) {
  // do something
});
```

2. Use oauth2 token

```js
// url is your gitlab api path such as http://example.com/api/v4/
// token is your oauth2 token
const gitlab = require('gitlab-node').connect(url, token, true);

gitlab.issues.proejcts(projectId).then(function(issues) {
  // do something
});
```

## API

See [detail](http://huang-x-h.github.io/node-gitlab)
