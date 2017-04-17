
module.exports = queryAll;

/**
 * query all records
 *
 * @param {*} connection
 * @param {string} url
 * @param {object} qs
 * @return {Promise}
 */
function queryAll(connection, url, qs) {
  function query(params) {
    return connection(url, {
      query: Object.assign({}, params, qs)
    });
  }

  return new Promise(function (resolve, reject) {
    var data = [],
      params = {
        page: 1,
        per_page: 100
      },
      cb = function (body) {
        data = data.concat(body);

        if (body.length == params.per_page) {
          params.page++;

          query(params).then(cb, reject);
        } else {
          resolve(data);
        }
      };

    query(params).then(cb, reject);
  });
}
