const ghpages = require('gh-pages');
const path = require('path');
const util = require('util');

let pkg = require('../package.json');
const publish = util.promisify(ghpages.publish);

publish(path.join('./doc', pkg.name, pkg.version)).then(() => { console.log('publish success.'); });
