
module.exports = queryAll;

/**
 *
 * @param url
 * @returns {Promise}
 */
function queryAll(connection, url) {
  function query(params) {
    return connection(url, {
      query: params
    });
  }

  return new Promise(function(resolve, reject) {
    var data = [],
      params = {
        page: 1,
        per_page: 100
      },
      cb = function(body) {
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
