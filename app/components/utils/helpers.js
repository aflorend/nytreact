// Require axios
const axios = require('axios');

// NYT API
const apikey = '257eba048815405ba6d1eed17d1e7aca';

var helper = {
  runQuery: function(term, start, end) {
    console.log(term, start, end);

    // NYT API search with axios
    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${term}&begin_date=${start}0101&end_date=${end}1231&sort=newest&page=0`;
    console.log(queryURL);

    return axios.get(queryURL).then(function(res) {
      // Return results if we receive them, or else return an empty string
      if (res) {
        return res.data.response.docs;
      }
      return '';
    });
  },

  // Hits servers to retrieve saved articles
  getSaved: function() {
    return axios.get('/api');
  },

  postSaved: function(savedHeadline, savedUrl) {
    return axios.post('/api', {
      headline: savedHeadline,
      url: savedUrl
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  },

  deleteSaved: function(id) {
    return axios.delete(`/api/${id}`)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
};

module.exports = helper;
